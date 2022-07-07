import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Your server is single and ready to mingle in port ${PORT}`);
});
