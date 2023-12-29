const express = require('express');
const { userModel } = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    try{
        let user = await userModel.find();
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send({'error':e.message})
    }
})

userRouter.post("/register",async(req,res)=>{
    const {email,password,name} = req.body
    try{
        let already =await userModel.findOne({email});
        if(already){
            res.status(200).send("user_already_present")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.status(400).send("password_not_hashed")
                }else{
                    let user = new userModel({name,email,password:hash});
                    await user.save();
                    res.status(200).send("userAdded")
                }
            });
          
        }
    }
    catch(e){
        res.status(400).send({'error':e.message})
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                    var token = jwt.sign({ user }, 'ankit');
                    res.status(200).send({"loginSuccessful":user,token})
                }else{
                    res.status(200).send("Wrong password")
                }
            });
        }else{
            res.status(200).send("user_not_found")
        }
    }
    catch(e){
        res.status(400).send({'error':e.message})
    }
})

module.exports={userRouter}