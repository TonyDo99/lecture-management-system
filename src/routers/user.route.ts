import { body, param, ValidationChain } from "express-validator";
import {
  userRegister,
  userLogin,
  userInfo,
  userList,
  userDelete,
} from "../controllers/user.controller";
import { Router } from "express";
import { validatePayload } from "../middlewares/validate-request";
import { passport } from "../middlewares/authenticate";
const router = Router();

/**
 * Validation rules for user registration
 * @name validateCreate
 * @type {Array<ValidationChain>}
 */
const validateCreate: ValidationChain[] = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("The email not correct format")
    .notEmpty()
    .withMessage("The email should not be empty!"),
  body("password")
    .isString()
    .withMessage("The password must be a string!")
    .notEmpty()
    .withMessage("The password should not be empty!"),
  body("name")
    .trim()
    .isString()
    .withMessage("The name should be a string!")
    .isLength({ max: 50 })
    .withMessage("The length of name cannot be too over 50 characters")
    .notEmpty()
    .withMessage("The name should not be empty!"),
  body("role").default("user"),
];

/**
 * Validation rules for user login
 * @name validateLogin
 * @type {Array<ValidationChain>}
 */
const validateLogin: ValidationChain[] = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("The email not correct format")
    .notEmpty()
    .withMessage("The email should not be empty!"),
  body("password")
    .isString()
    .withMessage("The password must be a string!")
    .notEmpty()
    .withMessage("The password should not be empty!"),
];

/**
 * Validation rules for delete user
 * @name validateDelete
 * @type {Array<ValidationChain>}
 */
const validateDelete: ValidationChain[] = [
  param("id")
    .trim()
    .isString()
    .withMessage("The id lecture must be a string!")
    .notEmpty()
    .withMessage("The id lecture should not be empty!"),
];

/**
 * Routes for user operations
 * @name userRouter
 * @type {Router}
 */

/**
 * Express router providing user related routes
 * @module routers/user
 */
router.post("/login", validatePayload(validateLogin), userLogin);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userInfo,
);
router.get("/list", passport.authenticate("jwt", { session: false }), userList);
router.post("/register", validatePayload(validateCreate), userRegister);
router.delete("/:id", validateDelete, userDelete);

export default router;
