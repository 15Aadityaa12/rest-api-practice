//students.js
const express = require('express')
const students = require('../data/data.js')
const router = express.Router()

router.use((req,res,next)=>{
    console.log("someone hit the router MW")
    next();
})
function validate_student(req,res,next){
    const {name,email} = req.body;
    if(!name || !email){
        return res.status(400).json({error:"give the details."})
    }
    next();
}
router.get('/', (req,res)=>{
    res.status(200).json(students)
})

router.get('/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        const err = new Error("id is invalid")
        err.status = 404;
        next(err);

    }
    const student = students.find(s=>s.id===id)
    if(!student){
        const err = new Error('student not found')
        next(err);
    } 
    else{res.status(200).json(student)}  
    
})
router.post('/',validate_student,(req,res)=>{
    const new_student = req.body;
    
        // const ids = students.map(s=>s.id);
        const max_id = students.length>0? Math.max(...students.map(s=>s.id)):0
    students.push(new_student)
    new_student.id = max_id+1;
    res.status(201).json(new_student)
     
})
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const index = students.findIndex(s=>s.id===id)
    if(index===-1){
        return res.status(404).json({ error: 'Student not found' });
    }
    else{
    const updated_data = req.body;
    students[index]={...students[index],...updated_data,id: id}
    res.status(200).json(students[index])
     }


})
router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = students.findIndex(s=> s.id===id)

     if (index === -1) {
        const err = new Error('student not found')
        err.status = 404;
        next(err);
    }
    students.splice(index,1)
    res.json({"message": "deleted"})
})

module.exports = router