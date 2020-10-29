const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const config = require('./config/key');
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongoDB connected'))
	.catch(err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/menu', require('./routes/menuItem'));

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});