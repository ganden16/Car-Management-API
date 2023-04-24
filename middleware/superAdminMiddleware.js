const jwt = require('jsonwebtoken')

const superAdminMiddleware = (req, res, next) => {
	const tokenUser = req.header('Authorization').split(' ')[1]
	const decoded = jwt.verify(tokenUser, process.env.SECRET_KEY_ACCESS_TOKEN)
	if(decoded.role != 'super-admin') {
		return res.status(403).json({
			error: {
				name: 'forbidden access',
				message: 'access allowed only super-admin',
			}
		})
	}
	return next()
}

module.exports = superAdminMiddleware