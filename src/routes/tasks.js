const express = require('express');

const router = express.Router();
const Task = require('../models/Task');


router.get('/',async (req,res) =>{
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.json({
    status: 'Task saved'
  });  
});

router.get('/:id', async (req,res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});


router.put('/:id', async (req,res) => {
  const id = req.params.id;
  await Task.findByIdAndUpdate(id, req.body)
  res.json({
    status: 'Task updated'
  })
});

router.delete('/:id', async (req,res) => {
  const id = req.params.id
  await Task.findByIdAndRemove(id);
  res.json({
    status: 'Task Deleted'
  })
});


module.exports = router;