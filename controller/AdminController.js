const {
	getAllAdminService, findAdminService,
	addAdminService, destroyAdminService
} = require('../service')

module.exports = class AdminController {

	static async get(req, res) {
		const queryName = req.query.name || ''
		const admin = await getAllAdminService(queryName)
		if(admin.length > 0) {
			return res.status(200).json({
				status: true,
				message: 'list admin data',
				total: admin.length,
				data: admin
			})
		}
		else {
			return res.status(400).json({
				status: false,
				message: 'admin data not found',
				data: 0
			})
		}
	}

	static async show(req, res) {
		const admin = await findAdminService(req.params.id)
		if(admin) {
			return res.status(200).json({
				status: true,
				message: 'show admin data',
				data: admin
			})
		} else {
			return res.status(400).json({
				status: false,
				message: 'admin data not found',
				data: {}
			})
		}
	}

	static async store(req, res) {
		const dataAdmin = req.body
		const admin = await addAdminService(dataAdmin)
		if(admin) {
			return res.status(201).json({
				status: true,
				message: "admin data has been success added",
				data: admin
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "an error occurred, admin data failed to added",
				data: {}
			})
		}
	}

	static async delete(req, res) {
		const data = await destroyAdminService(req.params.id)
		if(data) {
			return res.status(200).json({
				status: true,
				message: "admin data has been deleted successfully",
				data
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "admin data failed to deleted",
				data: 0
			})
		}
	}

}