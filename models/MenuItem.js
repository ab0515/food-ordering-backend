const mongoose = require('mongoose');

let menuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	restaurant_id: {
		type: mongoose.ObjectId,
		ref: 'Restaurant',
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	}
});

const Menu = mongoose.model('MenuItem', menuItemSchema);
// Menu.insertMany([
// 	{restaurant_id:"5f99d05e0eb41585eb070fc3",
// 	name:"Mocha Latte",
// 	description:"Proin mi nisi, commodo sed turpis nec, consectetur volutpat urna.",
// 	price:5.21},
// 	{restaurant_id:"5f99d05e0eb41585eb070fc3",
// 	name:"Espresso",
// 	description:"Sed odio nisi, scelerisque quis elit ac, tristique finibus odio. In tempus luctus dui, id fringilla sapien euismod eu.",
// 	price:2.9},
// 	{restaurant_id:"5f99d05e0eb41585eb070fc3",
// 	name:"Salad",
// 	description:"Nulla et nisl congue, efficitur nulla nec, auctor sapien.",
// 	price:7.89},
// 	{restaurant_id:"5f99d05e0eb41585eb070fc3",
// 	name:"Matcha Latte",
// 	description:"Aenean neque metus, tincidunt in aliquet id, ullamcorper in tellus.",
// 	price:5.62},
// 	{restaurant_id:"5f99d13f0eb41585eb070fc5",
// 	name:"BBQ Chicken",
// 	description:"Donec pretium vulputate arcu, ac interdum arcu vulputate at.",
// 	price:12.48},
// 	{restaurant_id:"5f99d13f0eb41585eb070fc5",
// 	name:"Salt & Pepper Chicken",
// 	description:"Aenean faucibus rhoncus cursus. Donec pretium vulputate arcu, ac interdum arcu vulputate at.",
// 	price:12.68},
// 	{restaurant_id:"5f99d13f0eb41585eb070fc5",
// 	name:"Honey Mustard Chicken",
// 	description:"Ut lacus tellus, lacinia ac mi ullamcorper, maximus consequat nunc.",
// 	price:12.68},
// 	{restaurant_id:"5f99d02b0eb41585eb070fc2",
// 	name:"Bibimbap",
// 	description:"Sed ante nisi, tincidunt sit amet eros eu, mattis auctor augue.",
// 	price:11.68},
// 	{restaurant_id:"5f99d02b0eb41585eb070fc2",
// 	name:"Tteokbokki (stir-fried rice cakes)",
// 	description:"Ut vitae malesuada tortor. Curabitur sed bibendum libero.",
// 	price:7.38},
// 	{restaurant_id:"5f99d02b0eb41585eb070fc2",
// 	name:"Kimchi Fried Rice",
// 	description:"Nunc in libero et arcu maximus congue ac sit amet diam.",
// 	price:12.75},
// 	{restaurant_id:"5f98b0dbb681030e6e36b68b",
// 	name:"Poutine",
// 	description:"Aenean porta bibendum metus, eu malesuada ipsum pretium ut.",
// 	price:10.75},
// 	{restaurant_id:"5f98b0dbb681030e6e36b68b",
// 	name:"Bacon Poutine",
// 	description:"Integer et arcu vitae dolor fermentum ultrices. Phasellus sed justo neque.",
// 	price:12.75},
// 	{restaurant_id:"5f98b0dbb681030e6e36b68b",
// 	name:"Smoked Salmon Benedict",
// 	description:"Sed ultrices convallis ex.",
// 	price:15.97},
// 	{restaurant_id:"5f98b0dbb681030e6e36b68b",
// 	name:"Egg Benny",
// 	description:"Morbi feugiat hendrerit lectus, eu pharetra dui lobortis in.",
// 	price:14.21}
// ])

module.exports = Menu;