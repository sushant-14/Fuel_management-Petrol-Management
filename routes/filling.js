const express=require('express');
const router=express.Router();
const fillingController=require('../controllers/fillingController')

console.log('router working')

router.get('/',fillingController.filling)
router.post('/add',fillingController.addfuel);
router.get('/checkstock',fillingController.checkStock);
router.get('/:id',fillingController.updatefuel);
router.post('/update/:id',fillingController.updateQuantity);
module.exports=router;
