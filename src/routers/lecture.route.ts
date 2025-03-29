import { Router } from 'express';
import multer from 'multer';
import {
  lectureDelete,
  lectureInfo,
  lectureCreate,
  lectureUpdate,
  lectures,
} from '../controllers/lecture.controller';
import { body, param, ValidationChain } from 'express-validator';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

/**
 * Validation rules for create lecture
 * @name validateCreate
 * @type {Array<ValidationChain>}
 */
const validateCreate: ValidationChain[] = [
  body('title')
    .trim()
    .isString()
    .withMessage('The title lecture must be a string!')
    .notEmpty()
    .withMessage('The title lecture should not be empty!')
    .isLength({ min: 5, max: 200 })
    .withMessage(
      'The title lecture must be between 5 and 100 characters long!'
    ),
  body('description')
    .optional({
      checkFalsy: true,
    })
    .trim()
    .isString()
    .withMessage('The description lecture must be a string!')
    .notEmpty()
    .withMessage('The description lecture should not be empty!')
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'The description lecture must be between 0 and 500 characters long!'
    ),
  body('author')
    .optional({
      checkFalsy: true,
    })
    .trim()
    .isString()
    .withMessage('The author lecture must be a string!')
    .notEmpty()
    .withMessage('The author lecture should not be empty!'),
];

/**
 * @swagger
 * /lectures/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Lectures
 *     summary: Get lecture by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lecture details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lecture not found
 */
router.get('/:id', lectureInfo);

/**
 * @swagger
 * /lectures:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Lectures
 *     summary: Get all lectures
 *     responses:
 *       200:
 *         description: List of lectures retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', lectures);

/**
 * @swagger
 * /lectures/create:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Lectures
 *     summary: Create new lecture
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *               author:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Lecture created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/create', validateCreate, upload.single('video'), lectureCreate);

/**
 * Validation rules for delete lecture
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
 * @swagger
 * /lectures/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Lectures
 *     summary: Delete lecture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lecture deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lecture not found
 */
router.delete('/:id', validateDelete, lectureDelete);

/**
 * Validation rules for delete lecture
 * @name validateUpdate
 * @type {Array<ValidationChain>}
 */
const validateUpdate: ValidationChain[] = [
  param('id')
    .trim()
    .isString()
    .withMessage('The id lecture must be a string!')
    .notEmpty()
    .withMessage('The id lecture should not be empty!'),
  ...validateCreate,
];

/**
 * @swagger
 * /lectures/{id}:
 *   patch:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Lectures
 *     summary: Update lecture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *               author:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Lecture updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lecture not found
 */
router.patch('/:id', validateUpdate, upload.single('video'), lectureUpdate);

export default router;
