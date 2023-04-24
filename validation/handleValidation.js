const fs = require('fs')
const {validationResult} = require('express-validator')

const handleValidation = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		//hapus file jika gagal validasi
		if(req.file) {
			fs.unlinkSync(req.file.path);
		}
		const formattedErrors = errors.array().reduce((acc, error) => {
			acc.push({message: error.msg, field: error.path});
			return acc;
		}, []);
		return res.status(400).json({errors: formattedErrors});
	}
	next();
};

module.exports = handleValidation