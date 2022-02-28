const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/transporter');

const createNewToken = (user)=>{
    //take user id and screte key and make a token with help of sign and return it
    return jwt.sign({id:user.id},process.env.JWT_SECRETE_KEY);
}
const signup = async(req,res)=>{
   
    try{
        let user;

        //check if user has already signup or not with help of provided email
        user = await User.findOne({email:req.body.email});

      
        //if user exist then return with error
        if(user) return res.status(401).json({status:"failed",message:"This email is already in use."});

        //else create a new user
        user = await User.create(req.body);

        //create a token for user 
        const token = createNewToken(user);

        //send mail to user as signup success
        var message = {
            from: "rahul@iwtribe.com",
            to: `${user.email}`,
            subject: "Signup message",
            text: "Thank you for registring on iwtribe",
            html: "<p>Welcome in iwtribe</p>"
          };
        
          transporter.sendMail(message)

        //return userddata with token
        res.status(201).json({user,token});
    }catch(err){
        res.status(500).json({msg:"something went wrong"})
    }
}


const signin = async(req,res)=>{
    try{
        let user;
        
        //find with user with email
        user = await User.findOne({email:req.body.email});
        
        //if user not found
        if(!user) return res.status(401).json({status:"failed", message:"user is not registered"})
        
        //if user found then check password
        const match = await user.verifyPassword(req.body.password);
        

        //if passsword not match
        if(!match) return res.status(401).json({status:"failed", message:"wrong password"});

         //create a token and return it
         const token = createNewToken(user);
        
         //send mail to user as login success
         var message = {
            from: "rahul@iwtribe.com",
            to: `${user.email}`,
            subject: "signin message",
            text: "Login success",
            html: "<p>Welcome in iwtribe</p>"
          };
        
          transporter.sendMail(message)

        res.status(200).json({token,user})
    }catch(err){
        res.status(500).json({msg:"something went wrong"})
    }
}

module.exports = {signin,signup};