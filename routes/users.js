const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeController=require('../controllers/homeController')

router.get('/about/:id',passport.checkAuthentication,homeController.about);
router.post('/update/:id',passport.checkAuthentication,homeController.update)
router.post('/signup',homeController.create);
router.get('/sign-up',homeController.signUp)
router.get('/sign-in',homeController.signIn);
// use passport at a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
)  ,homeController.createSession);

router.get('/sign-out',homeController.destroySession)
router.use('/filling',require('./filling'));
router.use('/slip',require('./slip'));

module.exports=router;