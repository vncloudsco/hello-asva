const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Khoi dong bodyParser middleware
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// Ket noi co so du lieu
connectDB()

//Routes
import grouprouter from './routes'

app.use(grouprouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
