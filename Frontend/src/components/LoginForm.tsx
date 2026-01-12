import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { login } from '../api/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }}/>
                <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }}/>
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </Container>
    );
};

export default LoginForm;
