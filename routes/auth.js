const express = require('express')
const  router = express.Router()


const AuthController  = require('../controllers/AuthController')
const Authpharm  = require('../controllers/Authpharm')

const upload    = require('../middleware/upload')

 
router.post('/register',upload.single('avatar'), AuthController.register)
router.post('/login',AuthController.login)
router.post('/registerpharm',Authpharm.registerpharm)
router.post('/loginpharm',Authpharm.loginpharm)

module.exports= router