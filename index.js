const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const User = mongoose.model('User', 
                { name: String,
                email:String,
                password:String
                }
);


app.get("/users",(req,res)=>{
    User.find({}).then((data)=>{res.send(data)})
})
app.get("/users/:id",(req,res)=>{
    const userId=req.params.id
    User.find({_id:userId}).then((data)=>{res.send(data)})
})

app.post("/users",(req,res)=>{
    const {name,email,password}=req.body
    const newUser= new User({
        name:name,
        email:email,
        password:password
    })
    newUser.save().then(()=>{res.send("user inserted")})
})

app.put("/users/:id",(req,res)=>{
    const userId=req.params.id
    const {name,email,password}=req.body
    User.findByIdAndUpdate(userId,{
        name:name,
        email:email,
        password:password
    }).then(()=>{res.send("user updated")})

})

app.delete("/users/:id",(req,res)=>{
    const userId=req.params.id
    User.findByIdAndDelete(userId).then(()=>{res.send("user deleted")})
})
app.listen(3000,()=>{
    console.log("server is up and running")
})