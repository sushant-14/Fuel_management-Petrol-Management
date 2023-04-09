const Slip=require('../models/slip');
const Filling=require('../models/filling');




module.exports.submitSlip=async function(req,res){
    try{
        // if(req.body.fuel==="Petrol"){
        //     var price=100
        // }else if(req.body.fuel==="Disel"){
        //     var price=80
        // }else{
        //     var price=50
        // }

        let filling=await Filling.findOne({type:req.body.fuel})
        var price=filling.price
        console.log(filling.price,"fillingprice")
        
        let slip=await Slip.create({
            date:req.body.date,
            day:req.body.day,
            time:req.body.time,
            customer:req.body.customer,
            fuel:req.body.fuel,
            quantity:req.body.quantity,
            user:req.body.user,
            payment:req.body.payment,
            price:price,
            total:price*(req.body.quantity)

        })

        let updateQunatity=Number(filling.quantity)-Number(req.body.quantity)
        let updateStock=await Filling.findByIdAndUpdate(filling.id,{quantity:updateQunatity},{new:true})
        console.log("filling",filling)
        console.log(updateStock,"updateStock")

    return res.render('slipReport',{
        title:"Slip",
        slip:slip,
        updateStock:updateStock
    })

    }catch(err){
        if(err){
            console.log('error in creating slip',err)
            return;
        }
    }
}

module.exports.report=function(req,res){
    Slip.find({},function(err,slip){
        return res.render('report',{
            title:"report page",
            report:slip
        })

    })
}


// module.exports.filter=function(req,res){
//     console.log(req.body)
//     date1=req.body.date1
//     date2=req.body.date2
//     Slip.find({},function(err,data){
//         res.render('filter',{
//             filter:data,
//             title:"Search filer"
//         })
//     })
// }

module.exports.filter =async function(req, res) {
    console.log(req.body);
    const date1 = new Date(req.body.date1);
    console.log("date1",date1)
    const date2 = new Date(req.body.date2);
    console.log("date2",date2)
//  $gte is a MongoDB operator that stands for "greater than or equal to". 
// $lte is another MongoDB operator that stands for "less than or equal to".   
    let filter=await Slip.find({ date: { $gte: date1, $lte: date2 } })
    console.log("flietrrr",filter)
        // , function(err, data) {
        // if (err) {
        //     console.error('Failed to fetch data from the database:', err);
        //     return;
        // }
     
        res.render('filter', {
            filter: filter,
            title: 'Search filter'
        });
   
};