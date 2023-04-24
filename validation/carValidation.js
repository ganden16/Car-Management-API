const {body} = require('express-validator');

const carValidation = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('type').notEmpty().withMessage('Type cannot be empty'),
	body('size').notEmpty().withMessage('Size cannot be empty').isString().withMessage('Type must be string'),
	body('price').isNumeric().withMessage('Price must be numeric'),
]

module.exports = carValidation;
