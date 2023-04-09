const mongoose=require('mongoose');

const fillSchema=new mongoose.Schema({
    type:{
        type:String,
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Filling=mongoose.model('Filling',fillSchema);
module.exports=Filling;