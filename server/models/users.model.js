const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true, min:8},
},{
    versionKey:false,
    timestamps:true
})

//before saving user in database hashed the password for security purpose

userSchema.pre('save',function (next){

    //check if password is modified are not
    //if password is not modifies then call next

    if(!this.isModified('password')) return next();

    //else hash the password

    bcrypt.hash(this.password,8,(err,hashed)=>{

        // if there is some err then call next with error
        if(err) return next(err)

        //else update the password whith hashed one
        this.password = hashed

        //call next

        next();
    })

})

//method for verify the password during login

userSchema.methods.verifyPassword = function(password){

    //get saved password during signup
    const hashedPassword = this.password;

    return new Promise((resolve,reject)=>{

        bcrypt.compare(password,hashedPassword,(err,matchResult)=>{
            if(err) reject(err)

            resolve(matchResult);
        })
    })


}
//export user model
module.exports = mongoose.model('user',userSchema);