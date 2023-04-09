const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeController=require('../controllers/homeController')

console.log('router working')
router.get('/',homeController.home);
router.use('/users',require('./users'))
// router.post('/sign-out',homeController.destroySession)

module.exports=router;
