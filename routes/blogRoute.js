const express = require("express")
const blogModel = require("../models/blogModel")
const blogRouter = express.Router()
const auth = require("../middleware/auth.middleware")

blogRouter.get("/", async (req, res) => {
    const titleQuery = req.query.title;
    const categoryQuery = req.query.category;
    const sortQuery = req.query.sort;
    try {
        let blogs
        const query = {}
        if (titleQuery) {
            query.title = { $regex: titleQuery, $options: "i" }
        }
        if (categoryQuery) {
            query.category = categoryQuery;
        }
        blogs = await blogModel.find(query)

        if (blogs.length === 0) {
            return res.status(400).json({ msg: "No blogs found with specified data" })
        }

        if (sortQuery === "asc") {
            blogs = blogs.sort((a, b) => a.date - b.date)
        } else if (sortQuery === "desc") {
            blogs = blogs.sort((a, b) => b.date - a.date)
        }
        res.send(blogs)
    } catch (err) {
        res.status(400).json({Error:err.message})
    }
})


blogRouter.post("/add",auth,async(req,res)=>{
    const {userId,username,title,content,category,date,likes,comments}=req.body
    const newblogs=new blogModel({
        userId,username,title,content,category,date,likes,comments
    })
    try{
        const blog=await newblogs.save()
        res.status(200).json(blog)
    }catch(err){
        res.status(400).json({Error:err.message})
    }
})

blogRouter.patch("/edit/:id",auth,async(req,res)=>{
    const blogId=req.params.id
    const updateFields=req.body
    try{
        await blogModel.findByIdAndUpdate({_id:blogId},updateFields)
        res.status(200).json({Msg:"fields Updated"})
    }catch(err){
        res.status(400).json({Error:err.message})
    }
})

blogRouter.patch("/delete/:id",auth,async(req,res)=>{
    const blogId=req.params.id
    try{
        await blogModel.findByIdAndUpdate({_id:blogId})
        res.status(200).json({Msg:"Data deleted"})
    }catch(err){
        res.status(400).json({Error:err.message})
    }
})

module.exports = {
    blogRouter
}