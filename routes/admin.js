const {Router} = require('express')
const router = Router()

const {authMiddleware, adminMiddleware, superAdminMiddleware} = require('../middleware')
const {userValidation, handleValidation} = require('../validation')
const {AdminController} = require('../controller')

router.get('/', authMiddleware, adminMiddleware, AdminController.get)
router.get('/:id', authMiddleware, adminMiddleware, AdminController.show)
router.post('/', authMiddleware, superAdminMiddleware, userValidation, handleValidation, AdminController.store)
router.delete('/:id', authMiddleware, superAdminMiddleware, AdminController.delete)

module.exports = router