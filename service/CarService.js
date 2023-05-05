const {Car, User} = require('../models')
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')
const port = process.env.PORT ?? 5000
const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`

const getAllCarService = async (whereQuery) => {
	try {
		const {name, type} = whereQuery
		const cars = await Car.findAll({
			attributes: [
				'id', 'name', 'type', 'size', 'price', 'image', 'createdAt', 'updatedAt'
			],
			include: [
				{model: User, as: 'createdBy', attributes: ['id', 'name', 'email', 'role']},
				{model: User, as: 'lastUpdatedBy', attributes: ['id', 'name', 'email', 'role']},
			],
			where: {
				[Op.and]: [
					{name: {[Op.iLike]: `%${name}%`}},
					{type: {[Op.iLike]: `%${type}%`}}
				]
			},
			order: [['updatedAt', 'DESC']]
		})
		return cars
	} catch(error) {
		return false
	}
}

const getAllDeletedCarService = async () => {
	try {
		const deletedCars = await Car.findAll({
			where: {
				deletedAt: {[Op.ne]: null}
			},
			paranoid: false,
			attributes: [
				'id', 'name', 'type', 'size', 'price', 'image', 'deletedAt'
			],
			include: [
				{model: User, as: 'deletedBy', attributes: ['id', 'name', 'email', 'role']}
			],
		})
		return deletedCars
	} catch(error) {
		return false
	}
}

const findCarService = async (id) => {
	try {
		return await Car.findByPk(id, {
			attributes: [
				'name', 'type', 'size', 'price', 'image', 'createdAt', 'updatedAt'
			],
			include: [
				{model: User, as: 'createdBy', attributes: ['id', 'name', 'email', 'role']},
				{model: User, as: 'lastUpdatedBy', attributes: ['id', 'name', 'email', 'role']}
			],
		})
	} catch(error) {
		return false
	}
}
const addCarService = async (car, credentials, file) => {
	try {
		const decoded = jwt.verify(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		car.image = file?.filename ? `${baseUrl}/upload/cars/${file.filename}` : null
		car.created_by = decoded.user_id
		car.last_updated_by = decoded.user_id
		const newCar = await Car.create(car, {
			attributes: [
				'name', 'type', 'size', 'price', 'image', 'createdAt'
			],
			include: [
				{model: User, as: 'createdBy', attributes: ['id', 'name', 'email', 'role']},
			],
		})
		return Car.findByPk(newCar.id, {
			attributes: [
				'name', 'type', 'size', 'price', 'image', 'createdAt'
			],
			include: [
				{model: User, as: 'createdBy', attributes: ['id', 'name', 'email', 'role']},
			],
		})
	} catch(error) {
		return false
	}
}
const updateCarService = async (car, credentials, file) => {
	try {
		const oldCar = await Car.findByPk(car.id)
		car.image = file?.filename ? `${baseUrl}/images/car/${file.filename}` : oldCar.image
		const decoded = jwt.verify(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		car.last_updated_by = decoded.user_id
		await Car.update(car, {
			where: {
				id: car.id
			},
		})
		return await Car.findByPk(car.id, {
			attributes: [
				'name', 'type', 'size', 'price', 'image', 'updatedAt'
			],
			include: [
				{model: User, as: 'lastUpdatedBy', attributes: ['id', 'name', 'email', 'role']},
			],
		})
	} catch(error) {
		console.log(error)
		return false
	}
}
const destroyCarService = async (id, credentials) => {
	try {
		const decoded = jwt.verify(credentials, process.env.SECRET_KEY_ACCESS_TOKEN)
		await Car.update({deleted_by: decoded.user_id}, {
			where: {
				id
			}
		})
		const status = await Car.destroy({
			where: {
				id
			}
		})
		let data = null
		if(status) {
			data = await Car.findByPk(id, {
				paranoid: false,
				attributes: [
					'id', 'name', 'type', 'size', 'price', 'image', 'deletedAt'
				],
				include: [
					{model: User, as: 'deletedBy', attributes: ['id', 'name', 'email', 'role']}
				],
			})
		} else {
			await Car.update({deleted_by: null}, {
				where: {
					id
				}
			})
		}

		return {status, data}
	} catch(error) {
		return false
	}
}


module.exports = {
	getAllCarService, findCarService,
	addCarService, updateCarService,
	destroyCarService, getAllDeletedCarService
}