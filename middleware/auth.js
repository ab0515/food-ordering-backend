const User = require('../models/User');

let auth = (req, res, next) => {
	let token = req.cookies.jwt;

	User.findByToken(token, function (err, user) {
		// if (err) throw err;
		if (err || !user) {
			console.log(err);
			return res.json({
				isAuth: false,
				error: true
			});
		}
		req.token = token;
		req.user = user;
		next();
	});
};

module.exports = { auth };