const Filling=require('../models/filling');
module.exports.filling=function(req,res){
    return res.render('fillingfuel',{
        title:"filling fuel"
    })
}

module.exports.addfuel=async function(req,res){
try{
    // console.log(req,"req.body")
    let filling= await Filling.create(req.body);
    // console.log(filling,"filling")
   
    return res.redirect('back')

}catch(err){
    console.log('error in add fuel',err)
    return;
}}

module.exports.checkStock=async function(req,res){
    try{
        let allStock=await Filling.find({})
        return res.render('showStock',{
            title:"add stock",
            allStock:allStock
        });

    }catch(err){
        console.log('error in check fuel',err)
    return;
    }
}

module.exports.updatefuel=async function(req,res){
    try{
        let type=await Filling.findById(req.params.id)
        // console.log(type.quantity)
        return res.render('updatefuel',{
            title:"updatefuel", 
            type:type
        })

    }catch(err){
        console.log('error',err)
        return;
    }
}

module.exports.updateQuantity=async function(req,res){
    try{
        let type=await Filling.findById(req.params.id)
        // console.log(type.quantity)
        // console.log(req.body,"update");
        let updatedQuantity = Number(type.quantity) + Number(req.body.quantity);
        let updateQuantity=await Filling.findByIdAndUpdate(req.params.id,{ quantity: updatedQuantity,price:req.body.price }, { new: true })
        // console.log(updateQuantity,"updatequantity")
            return res.redirect('back')
    }catch(err){
        if(err){
            console.log(err,"error in update")
            return;
        }
    }

    }

   



