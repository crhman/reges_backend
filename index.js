import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRouts.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  connectDB();
});