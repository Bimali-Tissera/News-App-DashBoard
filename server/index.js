const express = require('express')
const cors= require('cors')
const mongoose= require('mongoose')
const { Timestamp } = require('mongodb')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    title : String,
    category:String,
    content : String,


},{ 
    timestamps : true
})

const userModel = mongoose.model("Articles",schemaData)




//read
//http://localhost:8080/
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data})
})



//create data and save data in mongoDb
//http://localhost:8080/create
/*
{
    name,
    category,
    description

}
*/
app.post("/create",async(req,res)=>{ 
    console.log(req.body)
    const data= new userModel(req.body)
    await data.save()
    res.send({success: true ,message:"data saved successfully",data:data})
})



//update Data
//http://localhost:8080/update
/*
{
    id:" ",
    name:"",
    category:"",
    description:""
}
 */
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} =req.body

    console.log(rest)
    const data = await userModel.updateOne({_id: id},rest)
    res.send({success:true,message:"Data updated successfully", data:data})
})



//Delete API
//http://localhost:8080/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id :id})
    res.send( {success: true,message: "Data deleted succssfully",data:data})
})



mongoose.connect("mongodb://127.0.0.1:27017/managearticles")
.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))
