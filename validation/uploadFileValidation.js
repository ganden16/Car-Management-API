//useless

const {body} = require('express-validator');

const uploadFileValidation = [
	body('file')
		.custom((value, {req}) => {
			if(!value) {
				throw new Error('Image is required');
			}
			return true;
		})
		.custom((value, {req}) => {
			const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
			if(!allowedTypes.includes(value.mimetype)) {
				throw new Error('File type not allowed, only jpeg, png, jpg');
			}
			return true;
		})
		.custom((value, {req}) => {
			const allowedSize = 2 * 1024 * 1024;
			if(value.size > allowedSize) {
				throw new Error('File size exceeds limit, maximum 2MB');
			}
			return true;
		}),
];

module.exports = uploadFileValidation