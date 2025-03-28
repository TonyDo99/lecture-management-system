import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './models/connection';
import './models/schema';
import userRouter from './routers/user.route';
import lectureRouter from './routers/lecture.route';
import { passport } from './middlewares/authenticate';

const app = express();

// Middleware
const middleware = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.json(),
  express.urlencoded({ extended: true }),
];

app.use(middleware);

// Routes
app.use('/api/user', userRouter);
app.use(
  '/api/lecture',
  passport.authenticate('jwt', { session: false }),
  lectureRouter
);

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Server is running healthy' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
