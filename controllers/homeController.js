const { render } = require('ejs');
// model.js file import
const User = require("../models/user");
const Filling=require('../models/filling');


module.exports.home=function(req,res){
    User.find({},function(err,users){
        return res.render('home',{
            title:'home page',
            all_users:users,
            admin:"642e5ba283446e338b4734f2"
        });
    })
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/about');
    }

    return res.render("user_sign_up",{
        title:"Sign Up | page"
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/about');
    }
    return res.render("user_sign_in",{
        title:"Sign In | page"
    })
}


module.exports.about=async function(req,res){
    try{

        let all_user=await User.find({})
        
        console.log(all_user,"all_user")

        let user= await User.findById(req.params.id)
        console.log(user,"user")
        return res.render('about',{
            title:"about page is this",
            profile_user:user,
            all_users:all_user
        });



    }catch(err){
        console.log('error',err);
        return;
    }
    
  
}

module.exports.update=function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');

        })
    }else{
        return res.status(401).send('Unauthorized')
    }
}


module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user signing up");
            return
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}


// for passport
module.exports.createSession = function(req, res){
    return res.redirect('/')
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

