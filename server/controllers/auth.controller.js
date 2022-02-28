const user = require('../models/users.model');
const jwt = require('jsonwebtoken');
const createNewToken = (user)=>{
    //take user id and screte key and make a token with help of sign and return it
    return jwt.sign({id:user.id},process.env.JWT_SECRETE_KEY);
}
const signup = async(req,res)=>{
    try{
        let user;

        //check if user has already signup or not with help of provided email
        user = await user.findOne({email:req.body.email});

        //if user exist then return with error
        if(user) res.status(401).json({status:"failed",message:"This email is already in use."});

        //else create a new user
        user = await user.create(req.body);

        //create a token for user 
        const token = createNewToken(user);

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
        if(!user) res.status(401).json({status:"failed", message:"user is not registered"})

        //if user found then check password
        const match = await user.checkPassword(req.body.password);

        //if passsword not match
        if(!match) res.status(401).json({status:"failed", message:"wrong password"});

         //create a token and return it
         const token = getNewToken(user);
        res.status(200).send({token,user})
    }catch(err){
        res.status(500).json({msg:"something went wrong"})
    }
}

module.exports = {signin,signup};