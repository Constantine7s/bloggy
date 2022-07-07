import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ubhsuma.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB Error', err));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/auth/login', (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
    },
    'shhhhh'
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle at port ${PORT}`);
});
