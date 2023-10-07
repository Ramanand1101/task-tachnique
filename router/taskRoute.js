const express = require('express');
const {TaskModel}= require('../model/taskModel'); // Assuming your Task model file is in the correct path
const taskRouter = express.Router();

// POST /tasks: Add a new task
taskRouter.post('/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new TaskModel({ title, description, status });
    await task.save();
    res.status(201).json({"msg":"Task Created Successfully","task":task});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', 'error':error.message});
  }
});

// GET /tasks: Retrieve a list of all tasks
taskRouter.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /tasks/:id: Retrieve a specific task by ID
taskRouter.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /tasks/:id: Update a specific task by ID
taskRouter.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({"msg":"Task Updated Successfully",updatedTask});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /tasks/:id: Delete a specific task by ID
taskRouter.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).send("Task Deleted Successfully"); // 204 No Content: Successful deletion, no content to send
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = {taskRouter};
