/**
 * Controller for user authentication operations
 * @module auth.controller
 */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { IAuthenticatedUser } from '../middlewares/types';
import { bcryptSync } from '../utils/constant';
import { omit } from 'lodash';

/**
 * Registers a new user
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.create({
      ...req.body,
      password: bcryptSync(req.body.password),
    });

    const exclude = ['password'];
    const userInfo = omit(user.toObject(), exclude);

    res.status(201).json(userInfo);
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

/**
 * Authenticates and logs in a user
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password || '');
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-origin cookies
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

/**
 * Logs out a user by clearing the token cookie
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userLogout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

/**
 * Retrieves authenticated user information
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.user as IAuthenticatedUser;

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

const userList = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

const userDelete = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOneAndDelete({ _id: id });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).send({
      message: 'User deleted successfully',
    });
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

const userUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        password: bcryptSync(req.body.password),
      }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).send({
      message: 'User updated successfully',
    });
  } catch (error: unknown) {
    res.status(400).json({
      error,
    });
  }
};

export {
  userRegister,
  userLogin,
  userLogout,
  userInfo,
  userList,
  userDelete,
  userUpdate,
};
