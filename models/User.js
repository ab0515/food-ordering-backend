const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwtExpSeconds = 3600;
const saltRounds = 10;

let userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Number,
		default: 0
	},
	cart: {
		type: Array,
		default: []	
	},
	history: {
		type: Array,
		default: []
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	token: {
		type: String,
	},
	tokenExp: {
		type: Number
	}
});

// encrypt password when storing into DB
userSchema.pre('save', async function(next) {
	const user = this;
	// run this function only if password was modified
	try {
		if (user.isModified('password')) {
			let salt = await bcrypt.genSalt(saltRounds);
			let hash = await bcrypt.hash(user.password, salt);
			user.password = hash;

			next();
		} else {
			return next();
		}
		
	} catch(err) {
		return next(err);
	}
});

userSchema.methods.checkPassword = function (givenPwd, cb) {
	bcrypt.compare(givenPwd, this.password, (err, isValid) => {
		if (err) return cb(err);
		cb(null, isValid);
	});
};

userSchema.methods.generateToken = function (cb) {
	const user = this;
	const token = jwt.sign({uid: user._id.toHexString()}, 'secret', { 
		expiresIn: jwtExpSeconds	// expires in 1hr
	});
	user.tokenExp = moment().add(1, 'hour').valueOf();	// 1 hr from now in milliseconds
	user.token = token;

	user.save((err, doc) => {
		if (err) return cb(err);
		cb(null, doc);
	});
};

module.exports = mongoose.model('User', userSchema);