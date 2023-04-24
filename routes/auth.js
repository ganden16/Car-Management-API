const {Router} = require('express')
const router = Router()

const {AuthController} = require('../controller')
const {authMiddleware} = require('../middleware')
const {userValidation, handleValidation} = require('../validation')

router.post('/register', userValidation, handleValidation, AuthController.register)
router.post('/login', AuthController.login)
router.put('/profile', authMiddleware, AuthController.update)
router.delete('/logout', authMiddleware, AuthController.logout)
router.get('/me', authMiddleware, AuthController.currentUser)

module.exports = router