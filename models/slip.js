const mongoose=require('mongoose');

const slipSchema=new mongoose.Schema({
    date:{
        type:Date,
        required: true,
    },
    day:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    },
    fuel:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    total:{
        type:Number
    }
},{
    timestamps:true
});

const Slip=mongoose.model('Slip',slipSchema);
module.exports=Slip;