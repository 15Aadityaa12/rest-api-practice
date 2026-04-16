//server.js
const express = require('express')
const app = express()
const studentrouter = require('./routes/students.js')
const students = require('./data/data.js')
app.use(express.json())

app.use('/students', studentrouter)
app.get('/',(req,res)=>{
    res.send("welcome to ROUTING example and REST API")
})
app.listen(3000)