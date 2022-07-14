import express from 'express';
import mongoose from 'mongoose';
import { signUpValidation, loginValidation } from './middleware/auth.js';
import * as UserController from './controllers/UserController';
import * as PostController from './controllers/PostController';
import checkAuth from '../middleware/checkAuth.js';
-app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ubhsuma.mongodb.net/bloggy?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

app.post('/auth/signup', signUpValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getSelf);

app.post('/post', PostController.createPost);

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});
