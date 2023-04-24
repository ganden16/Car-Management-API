const {
	getAllAdminService,
	findAdminService,
	addAdminService,
	destroyAdminService
} = require('./AdminService')

const {
	registerService,
	loginService,
	updateProfileService,
	logoutService,
	currentUserService
} = require('./AuthService')

const {
	getAllCarService,
	findCarService,
	addCarService,
	updateCarService,
	destroyCarService,
	getAllDeletedCarService
} = require('./CarService')


module.exports = {
	registerService, loginService, updateProfileService, logoutService,
	currentUserService, getAllCarService, findCarService,
	addCarService, updateCarService, destroyCarService,
	getAllAdminService, findAdminService,
	addAdminService, destroyAdminService, getAllDeletedCarService
}

