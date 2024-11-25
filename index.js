const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./Routes/admin');  // Correctly import admin router
const userRouter = require('./Routes/user');

const app = express();
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/user', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
