const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require('./DB/connectDb');
dotenv.config();
const PORT = process.env.PORT || 2000;
connectDb();
app.use(express.json())
app.use('/auth' , require('./routers/auth.router'));

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`)
})