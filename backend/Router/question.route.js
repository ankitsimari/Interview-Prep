const express = require('express');
const { questionModel } = require('../Model/question.model');
const { auth } = require('../middleware');

const questionRouter = express.Router();

// questionRouter.use(auth)

questionRouter.get("/",async(req,res)=>{
    try{
        let question = await questionModel.find();
        res.status(200).send(question);
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})


questionRouter.post("/add",async(req,res)=>{
    try{
        let question = new questionModel(req.body);
        await question.save();
        res.status(200).send({"question_added":question})
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})

questionRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await questionModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send("updated")
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})

questionRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await questionModel.findByIdAndDelete({_id:id});
        res.status(200).send("deleted")
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})

module.exports={questionRouter}