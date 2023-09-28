const mongoose=require("mongoose");

const blogSchema=mongoose.Schema({
    userId:String,
    username:String,
    title:String,
    content:String,
    category:String,
    date:Date,
    likes:Number,
    comments:[
        {
            username:String,
            content:String
        }
    ]
})

const blogModel=mongoose.model("blog",blogSchema)

module.exports=blogModel