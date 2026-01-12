import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Attendance System API Running');
});

app.listen(5000, () => console.log('Server running on port 5000'));
