const express = require('express');
require('dotenv').config();

const app = express();

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err, 'Error when running server');
  }
  console.log('Server running on port ', process.env.PORT);
});