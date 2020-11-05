const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
	const {
		fullname,
		email,
		password
	} = req.body;

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
					success: true, userId: user._id
				});
		});
		
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
	}
});

module.exports = router;