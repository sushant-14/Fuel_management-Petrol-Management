const express=require('express');
const router=express.Router();
const slipController=require('../controllers/slipController');


router.post('/slipreport',slipController.submitSlip)
router.get('/',slipController.report);
router.post('/filter',slipController.filter)
module.exports=router;