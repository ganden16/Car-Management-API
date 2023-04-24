const {
	getAllCarService, findCarService,
	addCarService, updateCarService,
	destroyCarService, getAllDeletedCarService
} = require('../service')

module.exports = class CarController {
	static async get(req, res) {
		const {name, type} = req.query
		const whereQuery = {
			type: type || '',
			name: name || ''
		}
		const cars = await getAllCarService(whereQuery)
		if(cars.length > 0) {
			return res.status(200).json({
				status: true,
				message: "car data list",
				total: cars.length,
				data: cars
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, the car data list was not found",
				total: 0,
				data: []
			})
		}
	}
	static async getDeletedCar(req, res) {
		const deletedCars = await getAllDeletedCarService()
		if(deletedCars.length > 0) {
			return res.status(200).json({
				status: true,
				message: "deleted car data list",
				total: deletedCars.length,
				data: deletedCars
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, the deleted car data list was not found",
				total: 0,
				data: []
			})
		}
	}
	static async show(req, res) {
		const car = await findCarService(req.params.id)
		if(car) {
			return res.status(200).json({
				status: true,
				message: "car data found",
				data: car
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, car data not found",
				data: {}
			})
		}
	}
	static async store(req, res) {
		const credentials = req.header('Authorization').split(' ')[1]
		const file = req.file
		if(!file) {
			return res.status(400).json({
				error: {
					name: 'empty image file',
					message: 'image file is required'
				}
			})
		}
		const car = await addCarService(req.body, credentials, file)
		if(car) {
			return res.status(201).json({
				status: true,
				message: "car data added successfully",
				data: car
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, the car data failed to added",
				data: {}
			})
		}
	}
	static async update(req, res) {
		const file = req.file
		const credentials = req.header('Authorization').split(' ')[1]
		const dataBody = req.body
		dataBody.id = req.params.id
		const car = await updateCarService(dataBody, credentials, file)
		if(car) {
			return res.status(201).json({
				status: true,
				message: "car data updated successfully",
				data: car
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, car data failed to updated",
				data: {}
			})
		}
	}
	static async delete(req, res) {
		const credentials = req.header('Authorization').split(' ')[1]
		const {data, status} = await destroyCarService(req.params.id, credentials)
		if(status) {
			return res.status(200).json({
				status: true,
				message: "car data deleted successfully",
				data,
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, the car data failed to deleted",
				data: 0
			})
		}
	}
}