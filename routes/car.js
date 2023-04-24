const {Router} = require('express')
const router = Router()

const {CarController} = require('../controller')
const {uploadFileMiddleware, authMiddleware, adminMiddleware} = require('../middleware')
const {carValidation, handleValidation} = require('../validation')

router.get('/', authMiddleware, CarController.get)
router.get('/deleted', authMiddleware, adminMiddleware, CarController.getDeletedCar)
router.get('/:id', authMiddleware, CarController.show)
router.post('', authMiddleware, adminMiddleware, uploadFileMiddleware, carValidation, handleValidation, CarController.store)
router.put('/:id', authMiddleware, adminMiddleware, uploadFileMiddleware, carValidation, handleValidation, CarController.update)
router.delete('/:id', authMiddleware, adminMiddleware, CarController.delete)

module.exports = router