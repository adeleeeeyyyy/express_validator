const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 5000

const app = express();
app.use(express.json());
app.use(cors())

// const user = gshaheen
// const passowrd =n2mT5NboBPGWjAEB

mongoose.connect("mongodb+srv://Kita-hack:fryx1Mt1Dj0ZRHRe@cluster0.xpxsbcb.mongodb.net/Kita-hack?retryWrites=true&w=majority").then(()=>{
    console.log("Database connected")
})

app.get('/',(req,res)=>{
    res.send("Welcome to the server")
})

const UserRouter = require('./Module/User/user.route')
app.use("/api/v1/user",UserRouter)


app.listen(port,()=>{
    console.log("Server listening on port",5000)
})