//server.js
const express = require('express')
const app = express()
const studentrouter = require('./routes/students.js')
const students = require('./data/data.js')
app.use(express.json())


app.use('/students', studentrouter)
app.use((req,res,next)=>{
    const err = new Error("route not found");
    err.status = 404;
    next(err);
})
app.use((err,req,res,next)=>{
    console.log(err.message);

    res.status(err.status||500).json({"error":err.message || "error" })
    
})

app.get('/',(req,res)=>{
    res.send("welcome to ROUTING example and REST API")
})
app.listen(3000)