import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import signUpValidation from './validation/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/users.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ubhsuma.mongodb.net/bloggy?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/auth/signup', signUpValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      userPic: req.body.userPic,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'Shhhhh',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    return res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ message: "Couldn't save user"});
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
     return res.status(400).json({ message: "Couldn't find user" });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'Shhhhh',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    return res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ message: "Couldn't log in" });
  }
});

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});
