/**
 * Controller for user authentication operations
 * @module auth.controller
 */

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import { IAuthenticatedUser } from '../middlewares/types'

/**
 * Registers a new user
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const user = await UserModel.create({
      ...req.body,
      password: hash
    })
    res.status(201).json(user)
  } catch (error: unknown) {
    res.status(400).json({
      error
    })
  }
}

/**
 * Authenticates and logs in a user
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password || '')
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: 60 * 60 }
    )

    res.status(200).json({ token })
  } catch (error: unknown) {
    res.status(400).json({
      error
    })
  }
}

/**
 * Retrieves authenticated user information
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Promise representing completion
 */
const userInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.user as IAuthenticatedUser

    const user = await UserModel.findOne({
      email
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error: unknown) {
    res.status(400).json({
      error
    })
  }
}

export { userRegister, userLogin, userInfo }
