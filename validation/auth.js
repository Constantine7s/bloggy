import { body } from 'express-validator';

export const signUpValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').isLength({ min: 3 }),
  body('userPic').optional().isURL(),
];
