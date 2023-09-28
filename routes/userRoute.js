const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel")
const userRouter=express.Router()

userRouter.get("/",(req,res)=>{
    res.send("users Route")
})

userRouter.post("/register",async(req,res)=>{
    const {username,avtar,email,password}=req.body;
    try{
     bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({err:err})
        }else{
            const user=userModel({
                username,
                avtar,
                email,
                password:hash
            });
            await user.save();
            res.status(200).send({msg:"user registered successfully",user:user})
        }
     })
    }catch(err){
        res.status(500).send({err:err})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
     let user=await userModel.findOne({email:email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user._id,username:user.username},"blog")
                res.status(200).send({message:"Login successful",token:token}) 
            }else{
            res.status(400).send({message:"Invalid Credentials"})
            }
        })
    }else{
        res.status(400).send({msg:"user not found"})
    }
    }catch(err){
        res.status(500).send({err:err.message})
    }
})


module.exports={
    userRouter
}