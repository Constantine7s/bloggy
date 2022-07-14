import { body } from 'express-validator';

export const signUpValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').isLength({ min: 3 }),
  body('userPic').optional().isURL(),
];

export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),

];

export const createPostValidation = [
  body('title').isLength({ min: 1 }).isString(),
  body('text').isLength({ min: 3 }).isString(),
  body('tags').isString().optional(),
  body('imageUrl').isString().optional()
];
