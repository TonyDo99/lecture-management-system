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
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

// Middleware
const middleware = [
  cors({
    origin: [
      'http://localhost:3000',
      'https://fe-lecture-management-system.vercel.app',
    ],
    credentials: true,
  }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  session({
    secret: process.env.JWT_SECRET || '',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  }),
];
app.use(middleware);

// Routes
app.use('/api/user', userRouter);
app.use(
  '/api/lecture',
  passport.authenticate('jwt', { session: true }),
  lectureRouter
);

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Server is running healthy' });
});

app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
