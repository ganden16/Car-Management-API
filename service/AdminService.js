const {User} = require('../models')
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')

const getAllAdminService = async (queryName) => {
	try {
		return await User.findAll({
			attributes: ['id', 'name', 'email', 'role'],
			where: {
				[Op.and]: [
					{role: 'admin'},
					{name: {[Op.iLike]: `%${queryName}%`}}
				]
			}
		})
	} catch(error) {
		return false
	}
}

const findAdminService = async (id) => {
	try {
		return await User.findByPk(id, {
			attributes: ['id', 'name', 'email', 'role']
		})
	} catch(error) {
		return false
	}
}

const addAdminService = async (dataAdmin) => {
	try {
		const salt = bcrypt.genSaltSync(10)
		dataAdmin.password = bcrypt.hashSync(dataAdmin.password, salt)
		dataAdmin.role = 'admin'
		return await User.create(dataAdmin)
	} catch(error) {
		return false
	}
}

const destroyAdminService = async (id) => {
	try {
		const admin = await User.findByPk(id, {
			attributes: ['id', 'name', 'email', 'role']
		})
		const status = await User.destroy({
			where: {
				id
			}
		})
		if(status) return admin
		return false
	} catch(error) {
		return false
	}
}


module.exports = {
	getAllAdminService, findAdminService,
	addAdminService, destroyAdminService
}