const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const config = require('./config/key');

const bodyParser = require('body-parser');
const cookParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongoDB connected'))
	.catch(err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});