const {
	registerService,
	loginService,
	updateProfileService,
	logoutService,
	currentUserService
} = require('../service')

module.exports = class AuthController {
	static async register(req, res) {
		const user = await registerService(req.body)
		if(user) {
			return res.status(201).json({
				status: true,
				message: "the user has successfully registered",
				data: user
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "user failed to register, enter the form correctly",
				data: {}
			})
		}
	}

	static async login(req, res) {
		const {access_token, user} = await loginService(req.body)
		if(!access_token) {
			return res.status(400).json({
				status: false,
				message: "login failed, check your email and password"
			})
		}
		if(access_token) {
			return res.status(200).json({
				status: true,
				message: "successful login",
				data: {
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.role
					}
				},
				access_token,
				expired_access_token: "1 day",
			})
		}
	}

	static async update(req, res) {
		const credentials = req.header('Authorization').split(' ')[1]
		const data = await updateProfileService(req.body, credentials)
		if(data) {
			return res.status(201).json({
				status: true,
				message: "your profile has been updated successfully",
				data
			})
		} else {
			return res.status(500).json({
				status: false,
				message: "an error occurred, your profile failed to updated",
			})
		}
	}

	static async logout(req, res) {
		const credentials = req.header('Authorization').split(' ')[1]
		const status = await logoutService(credentials)
		if(status) {
			return res.status(200).json({
				status: true,
				message: "you have successfully logged out"
			})
		}
		if(!status) {
			return res.status(400).json({
				status: 'success',
				message: "you have logged out many times"
			})
		}
	}

	static async currentUser(req, res) {
		const credentials = req.header('Authorization').split(' ')[1]
		const user = await currentUserService(credentials)
		return res.status(200).json({
			status: true,
			message: "current user data",
			user
		})
	}
}