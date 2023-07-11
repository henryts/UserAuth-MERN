const router = require('express').Router()
const adminControllers=require('../Controllers/adminControllers')

router.post('/login',adminControllers.adminLogin)

router.get('/get-users',adminControllers.getAllUsers)

router.post('/edit-user',adminControllers.editUser)

router.delete('/delete-user/:id',adminControllers.deleteUser)


module.exports = router