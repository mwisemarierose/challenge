import express from 'express';
import cors from 'cors';
import issueRoutes from './routes/issueRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/issues', issueRoutes);

export default app;