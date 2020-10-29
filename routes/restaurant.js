const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.post("/addRestaurant", (req, res) => {
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

router.get("/getAllRestaurants", (req, res) => {
	// const data = await Restaurant.find();
	Restaurant.find()
		.then(rest => {
			return res.json({ success: true, rest });
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;