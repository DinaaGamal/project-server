const db = require('../models');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/keys').SECRET_KEY;
// const User = require('../models/user');

//authentication
exports.signin = async function(req, res, next) {
	try {
		//find user
		let user = await db.User.findOne({ email: req.body.email });
		let { id, username, profileImageUrl } = user; // destructure l user
		let isMatch = await user.comparePassword(req.body.password); //compare l password
		if (isMatch) {
			//generate token
			let token = jwt.sign({ id, username, profileImageUrl }, secretKey);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			});
		} else {
			return next({
				status: 400,
				message: 'Invalid Email or Password'
			});
		}
	} catch (err) {
		return next({
			status: 400,
			message: 'Invalid Email or Password'
		});
	}
};

exports.signup = async function(req, res, next) {
	try {
		//check user is already existoruse the same e-mail
		let foundUser = await db.User.findOne({ email: req.body.email });
		if (foundUser) {
			throw new Error(); //throw error bt excute l catch 3la toll
		} else {
			let user = await db.User.create(req.body); //create bt3ml new w save swa
			let { id, username, profileImageUrl } = user;
			//sign momkn ta5od parameter zyada hwa l options b8ir feh 7agat mnha l hashing algorythems
			let token = jwt.sign({ id, username, profileImageUrl }, secretKey);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			});
		}
	} catch (err) {
		//error 11000 bta3 mongoose byb2a kda E11000 duplicate key error index in mongodb mongoose so i make costum message here

		if (err.code === 11000) {
			err.message = 'Sorry , that Username and/or Email is already taken';
		}
		return next(err);
	}
};
