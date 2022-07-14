import express from 'express';
import mongoose from 'mongoose';
import signUpValidation from './middleware/auth.js';
import { login, register, getSelf } from './controllers/UserController'
import checkAuth from '../middleware/checkAuth.js';
-
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ubhsuma.mongodb.net/bloggy?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

app.post('/auth/signup', signUpValidation,register);
app.post('/auth/login',login);
app.get('/auth/me', checkAuth, getSelf);

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});

