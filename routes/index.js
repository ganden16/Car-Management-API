const {Router} = require('express')
const router = Router()

const authRouter = require('./auth')
const carRouter = require('./car')
const adminRouter = require('./admin')

router.use('/', authRouter)
router.use('/api/car', carRouter)
router.use('/api/admin', adminRouter)

router.use('/', (req, res) => {
	return res.status(400).json({
		status: false,
		message: 'endpoint not found'
	})
})

module.exports = router