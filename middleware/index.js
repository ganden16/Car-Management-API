const uploadFileMiddleware = require('./uploadFileMiddleware')
const authMiddleware = require('./authMiddleware')
const adminMiddleware = require('./adminMiddleware')
const superAdminMiddleware = require('./superAdminMiddleware')


module.exports = {uploadFileMiddleware, authMiddleware, adminMiddleware, superAdminMiddleware}