import express from 'express';
import mongoose from 'mongoose';
import {
  signUpValidation,
  loginValidation,
  createPostValidation,
} from './middleware/validation.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import checkAuth from './middleware/checkAuth.js';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ubhsuma.mongodb.net/bloggy?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

app.post('/auth/signup', signUpValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getSelf);

// app.get('/posts', PostController.getAllPosts);
// app.get('/posts/:id', PostController.getPostById);
app.post('/posts', checkAuth, createPostValidation, PostController.createPost);
// app.post('/posts', PostController.deletePost);
// app.patch('/posts', PostController.updatePost);

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});
