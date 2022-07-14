import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import upload from './middleware/storage.js'
import {
  signUpValidation,
  loginValidation,
  createPostValidation,
} from './middleware/validation.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import checkAuth from './middleware/checkAuth.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DB_URL;
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(DB)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

app.post('/auth/signup', signUpValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getSelf);

app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPostById);
app.post('/posts', checkAuth, createPostValidation, PostController.createPost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch('/posts/:id', checkAuth, PostController.updatePost);

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
  res.json({url: `./uploads/${req.file.originalname}`})
});

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});
