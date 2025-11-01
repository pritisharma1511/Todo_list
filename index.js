// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require('./Models/Todo');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/todo')

// app.get('/todos/get', (req, res) => {
//     TodoModel.find({}).then(result => {
//         const tasks = result.map(item => item.task);        
//         res.json(tasks);
//     }).catch(error => {
//         console.error("Error fetching tasks:", error);
//         res.status(500).json({ message: "Error fetching tasks", error: error });
//     });
// });

// app.post('/add', (req, res) => {
//     const task = req.body.task;
//     console.log("Received task:", task);
//     TodoModel.create({ task: task }).then(result => {
//         res.json({ message: "Task added successfully", task: result });
//     }).catch((err) => {
//         res.status(500).json({ message: "Error adding task", error: err });
//     });
// });

// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todo')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Fetch all todos
app.get('/todos/get', (req, res) => {
  TodoModel.find({})
    .then(result => res.json(result))
    .catch(error => {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Error fetching tasks", error });
    });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    console.log("Received task:", task);
    TodoModel.create({ task: task }).then(result => {
        res.json({ message: "Task added successfully", task: result });
    }).catch((err) => {
        res.status(500).json({ message: "Error adding task", error: err });
    });
});
// ✅ Delete todo by ID
app.delete('/todos/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted successfully", deletedTask: result });
    })
    .catch(err => {
      console.error("Error deleting task:", err);
      res.status(500).json({ message: "Error deleting task", error: err });
    });
});
// ✅ Toggle completed state
app.put('/todos/update/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  TodoModel.findByIdAndUpdate(id, { completed }, { new: true })
    .then(result => res.json({ message: "Task updated", updatedTask: result }))
    .catch(err => {
      console.error("Error updating task:", err);
      res.status(500).json({ message: "Error updating task", error: err });
    });
});


app.listen(3001, () => {
  console.log("✅ Server is running on port 3001");
});
