const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get("/auth", auth, (req,res) => {
	res.status(200).json({
		_id: req.user._id,
		isAuth: true,
		email: req.user.email,
		firstname: req.user.firstname,
		lastname: req.user.lastname,
		tokenExp: req.user.tokenExp
	});
});

router.post('/signup', async (req, res) => {
	const { email } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: 'Email already in use'
			});
		}

		user = new User(req.body);

		await user.save();
		user.generateToken((err, doc) => {
			if (err) return res.status(400).send(err);
			res.cookie('jwt', user.token)
				.status(200)
				.json({
					success: true, uid: user.id
				});
		});
		
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
	}
});

router.post('/login', async (req, res) => {
	const {
		email, password
	} = req.body;

	let user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({
			message: 'Wrong email or password'
		});
	}

	user.comparePassword(password, (err, isValid) => {
		if (isValid) {
			user.generateToken((err, doc) => {
				if (err) return res.status(400).send(err);
				return res.cookie('jwt', user.token)
							.status(200)
							.json({
								success: true, uid: user.id
							});
			});
		} else {
			return res.json({ success: false, message: 'Wrong email or password' });
		}
	})
});

router.get('/logout', auth, async (req, res) => {
	try {
		await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" });
		return res.status(200).json({
			success: true
		});
	} catch (e) {
		return res.json({
			success: false,
			err
		});
	}
});

module.exports = router;