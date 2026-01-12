import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "attendance_db",
    password: "your_password",
    port: 5432
});
