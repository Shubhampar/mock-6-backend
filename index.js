const express=require("express")
const connection=require("./db")

const cors=require("cors")
const {userRouter}=require("./routes/userRoute")
const {blogRouter}=require("./routes/blogRoute")

require("dotenv").config()

const app= express()
app.use(cors())
app.use(express.json())


app.use("/users",userRouter)
app.use("/blogs",blogRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`Server listening on port ${process.env.PORT}`)
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
});