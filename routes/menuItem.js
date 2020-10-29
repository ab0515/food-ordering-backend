const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get("/getRestaurantById", (req, res) => {
	let key = req.query.id;
	
	MenuItem.find({ restaurant_id: key })
		.populate('restaruant_id')
		.exec((err, items) => {
			return res.json({success: true, items});
		});
});

module.exports = router;