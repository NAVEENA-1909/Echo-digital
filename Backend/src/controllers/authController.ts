import { Request, Response } from 'express';
import { pool } from '../models/db';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role_id } = req.body;
        const hashedPassword = await hashPassword(password);

        const result = await pool.query(
            "INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *",
            [email, hashedPassword, role_id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userResult = await pool.query("SELECT u.id, u.email, u.password, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE email=$1", [email]);
        
        if (userResult.rows.length === 0) return res.status(400).json({ message: "User not found" });

        const user = userResult.rows[0];
        const valid = await comparePassword(password, user.password);

        if (!valid) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'your_jwt_secret', { expiresIn: '8h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
