const {User, Personal_Access_Token} = require('../models')
const {Op} = require("sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerService = async (user) => {
	try {
		const salt = bcrypt.genSaltSync(10)
		const hashPassword = bcrypt.hashSync(user.password, salt)
		user.password = hashPassword
		user.role = 'member'
		const response = await User.create(user)
		return response
	} catch(error) {
		return false
	}
}

const loginService = async (credentials) => {
	try {
		const user = await User.findOne({
			where: {
				email: credentials.email
			},
		})
		const matchPassword = bcrypt.compareSync(credentials.password, user.password)
		if(!matchPassword) return false
		const access_token = jwt.sign({
			user_id: user.id,
			name: user.name,
			email: user.email,
			role: user.role
		}, process.env.SECRET_KEY_ACCESS_TOKEN, {
			expiresIn: '1d'
		})
		const isLogin = await Personal_Access_Token.findOne({
			where: {
				[Op.and]: [
					{user_id: user.id},
					{expiredAt: {[Op.gt]: Date.now()}}
				]
			}
		})
		if(isLogin) {
			await Personal_Access_Token.update({
				access_token,
				expiredAt: Date.now() + 1000 * 60 * 60 * 24
			}, {
				where: {
					user_id: user.id
				}
			})
		} else {
			await Personal_Access_Token.create({
				user_id: user.id,
				access_token,
				expiredAt: Date.now() + 1000 * 60 * 60 * 24
			})
		}
		return {access_token, user}
	} catch(error) {
		console.log(error)
		return false
	}
}

const updateProfileService = async (dataUser, credentials) => {
	try {
		const decoded = jwt.decode(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		await User.update({
			name: dataUser.name,
			email: dataUser.email || decoded.email
		}, {
			where: {id: decoded.user_id}
		})
		return await User.findByPk(decoded.user_id)
	} catch(error) {
		return false
	}
}

const logoutService = async (credentials) => {
	try {
		const decoded = jwt.verify(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		const findToken = await Personal_Access_Token.findOne({
			where: {user_id: decoded.user_id, }
		})
		findToken.destroy()
		return true
	} catch(error) {
		return false
	}
}

const currentUserService = async (credentials) => {
	try {
		const decoded = jwt.verify(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		return await User.findOne({
			attributes: ['id', 'name', 'email', 'role'],
			where: {id: decoded.user_id}
		})
	} catch(error) {
		return false
	}
}


module.exports = {
	registerService, loginService,
	updateProfileService, logoutService, currentUserService
}