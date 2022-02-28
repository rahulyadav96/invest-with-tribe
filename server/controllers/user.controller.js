const express = require('express');
const User = require('../models/users.model');

const router = express.Router();

//route handler for fetch all users

router.get("",async(req,res)=>{
        const users = await User.find().lean().exec();
        res.json({users})
});

//delete a user

router.delete("/:id",async(req,res)=>{
    const user = await User.findByIdAndDelete({_id:req.params.id});
    res.json({user})
});

module.exports = router