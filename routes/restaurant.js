const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

const { auth } = require('../middleware/auth');

router.post("/addRestaurant", auth, (req, res) => {
	const restaurant = new Restaurant(req.body);
	restaurant.save()
		.then(doc => {
			console.log(doc);
			return res.status(200).json({ success: true });
		})
		.catch(err => {
			console.error(err);
			return res.status(400).json({ success:false, err });
		});
});

router.get("/getAllRestaurants", auth, (req, res) => {
	// const data = await Restaurant.find();
	Restaurant.find().sort({ name: 1 })
		.then(rest => {
			return res.json({ success: true, rest });
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;