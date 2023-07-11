const router = require('express').Router()
const userControllers=require('../Controllers/userControllers')
const upload=require('../config/multer')
const auth=require('../Middlewares/AuthMiddleware')


router.post('/signup',userControllers.Signup)

router.post('/login',userControllers.Login)

router.post('/update-profile',auth,userControllers.UpdateProfile)

router.post('/upload-profile-pic',auth,upload.single('image'),userControllers.uploadProfilePic)

router.get('/get-user',auth,userControllers.getUserDetails)


module.exports = router