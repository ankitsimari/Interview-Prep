const express = require('express');
const { auth } = require('../middleware');
const { openSourceQuestionModel } = require('../Model/openSource.model');

const openSourceRouter = express.Router();

// openSourceRouter.use(auth)

openSourceRouter.get("/",async(req,res)=>{
    try{
        let ques = await openSourceQuestionModel.find();
        res.status(200).send(ques)
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
});

openSourceRouter.post("/add",auth,async(req,res)=>{
    
    try{
        let ques = new openSourceQuestionModel(req.body);
        await ques.save();
        res.status(200).send("question_added")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})


openSourceRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await openSourceQuestionModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send("updated")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
});


openSourceRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await openSourceQuestionModel.findByIdAndDelete({_id:id});
        res.status(200).send("deleted")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})


module.exports={openSourceRouter}