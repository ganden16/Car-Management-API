const {body} = require('express-validator');
const {User} = require('../models');

const emailValidator = async (email) => {
	const user = await User.findOne({
		where: {email}
	});
	if(user) {
		return Promise.reject('Email already in use, please input different email');
	}
}
const userValidation = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Invalid email format').custom(emailValidator),
	body('password').notEmpty().withMessage('Password cannot be empty').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
	body('confirm_password').notEmpty().withMessage('Confirm password cannot be empty').custom((value, {req}) => {
		if(value !== req.body.password) {
			throw new Error('Passwords does not match');
		}
		return true;
	}),
];

module.exports = userValidation;
