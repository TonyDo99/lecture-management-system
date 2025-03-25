import { Router } from 'express'
import multer from 'multer'
import { lectureDelete, lectureInfo, lectureCreate, lectureUpdate } from '../controllers/lecture.controller'
import { body, param, ValidationChain } from 'express-validator'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
})

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
    .withMessage('The title lecture must be between 5 and 100 characters long!'),
  body('description')
    .optional({
      checkFalsy: true
    })
    .trim()
    .isString()
    .withMessage('The description lecture must be a string!')
    .notEmpty()
    .withMessage('The description lecture should not be empty!')
    .isLength({ min: 0, max: 500 })
    .withMessage('The description lecture must be between 0 and 500 characters long!'),
  body('author')
    .optional({
      checkFalsy: true
    })
    .trim()
    .isString()
    .withMessage('The author lecture must be a string!')
    .notEmpty()
    .withMessage('The author lecture should not be empty!')
]

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
    .withMessage('The id lecture should not be empty!')
]

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
  ...validateCreate
]

router.get('/:id', lectureInfo)
router.post('/create', validateCreate, upload.single('lecture'), lectureCreate)
router.delete('/:id', validateDelete, lectureDelete)
router.patch('/:id', validateUpdate, lectureUpdate)

export default router
