const db = require('../models');

// /api/users/:id/messages
exports.createMessage = async function(req, res, next) {
	try {
		// access db and create a message
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		// find attached user
		let foundUser = await db.User.findById(req.params.id);
		// push message to THAT user
		foundUser.messages.push(message.id);
		// have to manually save because i change db
		await foundUser.save();
		// by now the message has been saved successfully
		// populate user
		// hna feh problem hwa hna zahr l id w msh zahr username w l image r8m eny 3amla true lehom
		let foundMessage = await db.Message.findById(message.id).populate('user', {
			username: true,
			profileImageUrl: true
		});

		return res.status(200).json(foundMessage);
	} catch (err) {
		return next(err);
	}
};

exports.getMessage = async function(req, res, next) {
	try {
		let foundMessage = await db.Message.findById(req.params.message_id);
		return res.status(200).json(foundMessage);
	} catch (error) {
		return next(error);
	}
};

exports.deleteMessage = async function(req, res, next) {
	try {
		let foundMessage = await db.Message.findById(req.params.message_id);
		await foundMessage.remove();
		return res.status(200).json(foundMessage);
	} catch (err) {
		return next(err);
	}
};
