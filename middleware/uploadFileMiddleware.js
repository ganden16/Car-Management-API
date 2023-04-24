const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/upload/cars");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now().toString() + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if(
		file.mimetype == "image/png" ||
		file.mimetype == "image/jpg" ||
		file.mimetype == "image/jpeg"
	) {
		cb(null, true);
	} else {
		const errorFormatFile = new Error('format file allowed only jpg,jpeg,png')
		errorFormatFile.name = 'INVALID_FILE_FORMAT'
		return cb(errorFormatFile, false)
	}
};

const middleware = multer({
	storage,
	fileFilter,
	limits: {fileSize: 2 * 1024 * 1024}
}).single("image")

const uploadFileMiddleware = (req, res, next) => {
	middleware(req, res, (err) => {
		if(err != undefined) {
			if(err.name == 'INVALID_FILE_FORMAT') {
				return res.status(400).json({
					error: {
						name: err.name,
						message: err.message
					}
				})
			}
			if(err.code == 'LIMIT_FILE_SIZE') {
				return res.status(400).json({
					error: {
						name: err.code,
						message: "failed upload file, maximum file 2MB"
					}
				})
			}
		}
		next()
	})
}

module.exports = uploadFileMiddleware;
