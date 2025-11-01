const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  completed: {  // ✅ define directly, not nested inside another object
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // ✅ close schema here properly

const TodoModel = mongoose.model('Todos', todoSchema);
module.exports = TodoModel;
