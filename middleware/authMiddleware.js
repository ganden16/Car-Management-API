const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
	const authheader = req.header('Authorization')
	if(!authheader) {
		return res.status(400).json({
			error: {
				name: "empty credentials",
				message: "please login or enter your credentials"
			}
		})
	}
	const tokenUser = authheader.split(' ')[1]
	jwt.verify(tokenUser, process.env.SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
		if(err) {
			return res.status(400).json({
				error: {
					name: err.name,
					message: err.message,
				}
			})
		}
		next()
	})
}

module.exports = authMiddleware