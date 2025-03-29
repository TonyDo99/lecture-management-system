import { body, param, ValidationChain } from 'express-validator';
import {
  userRegister,
  userLogin,
  userLogout,
  userInfo,
  userList,
  userDelete,
  userUpdate,
} from '../controllers/user.controller';
import { Router } from 'express';
import { validatePayload } from '../middlewares/validate-request';
import { passport } from '../middlewares/authenticate';
const router = Router();

/**
 * Validation rules for user registration
 * @name validateCreate
 * @type {Array<ValidationChain>}
 */
const validateCreate: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('The email not correct format')
    .notEmpty()
    .withMessage('The email should not be empty!'),
  body('password')
    .isString()
    .withMessage('The password must be a string!')
    .notEmpty()
    .withMessage('The password should not be empty!'),
  body('name')
    .trim()
    .isString()
    .withMessage('The name should be a string!')
    .isLength({ max: 50 })
    .withMessage('The length of name cannot be too over 50 characters')
    .notEmpty()
    .withMessage('The name should not be empty!'),
  body('role').default('user'),
];

/**
 * Validation rules for user login
 * @name validateLogin
 * @type {Array<ValidationChain>}
 */
const validateLogin: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('The email not correct format')
    .notEmpty()
    .withMessage('The email should not be empty!'),
  body('password')
    .isString()
    .withMessage('The password must be a string!')
    .notEmpty()
    .withMessage('The password should not be empty!'),
];

/**
 * Validation rules for delete user
 * @name validateDelete
 * @type {Array<ValidationChain>}
 */
const validateDelete: ValidationChain[] = [
  param('id')
    .trim()
    .isString()
    .withMessage('The id lecture must be a string!')
    .notEmpty()
    .withMessage('The id lecture should not be empty!'),
];

/**
 * Validation rules for update user information
 * @name validateDelete
 * @type {Array<ValidationChain>}
 */
const validateUpdate: ValidationChain[] = [
  param('id')
    .trim()
    .isString()
    .withMessage('The id lecture must be a string!')
    .notEmpty()
    .withMessage('The id lecture should not be empty!'),
  body('name')
    .trim()
    .isString()
    .withMessage('The name should be a string!')
    .isLength({ max: 50 })
    .withMessage('The length of name cannot be too over 50 characters')
    .notEmpty()
    .withMessage('The name should not be empty!'),
  body('password')
    .isString()
    .withMessage('The password must be a string!')
    .notEmpty()
    .withMessage('The password should not be empty!'),
];

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validatePayload(validateLogin), userLogin);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', userLogout);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get(
  '/profile',
  passport.authenticate('jwt', { session: true }),
  userInfo
);

/**
 * @swagger
 * /api/users/list:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get list of users
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Users list retrieved successfully
 */
router.get('/list', passport.authenticate('jwt', { session: true }), userList);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', validatePayload(validateCreate), userRegister);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:id', validateDelete, userDelete);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch('/:id', validatePayload(validateUpdate), userUpdate);

export default router;
