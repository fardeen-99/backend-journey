import {body,validationResult} from "express-validator";


export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validate=[

    body("username").notEmpty()
    .trim()
    .isLength({min:4,max:20})
    .isString()
    .withMessage("Username must be between 4 and 20 characters"),
    body("email").notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email is required"),
    body("password").notEmpty()
    .trim()
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters"),
    handleValidationErrors
]

export const validateLogin=[
    body("email").notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email is required"),
    body("password").notEmpty()
    .trim()
    .withMessage("Password is required"),
    handleValidationErrors
]