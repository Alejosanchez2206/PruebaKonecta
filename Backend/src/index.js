require('dotenv/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { router } = require('./routers');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = 'http://localhost:5173';

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(router);

connectDB().then(() => console.log('DB Connect'));
app.listen(PORT, () => console.log('listening on port => ' + PORT));
