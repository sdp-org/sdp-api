const mongoose = require('mongoose')
const { Schema, model } = mongoose
const ENUMS = require('../__enums__')

const taskHistorySchema = new Schema({
  /**
   * Ref to taskID
   */
  task: { 
    type: Schema.ObjectId, 
    ref: 'tasks', 
    required: true 
  },
  /**
   * Ref to taskTypeID
   */
  taskType: { 
    type: Schema.ObjectId, 
    ref: 'taskTypes', 
    required: true 
  },
  /**
   * Status stamped on task update
   */
  status: {
    type: String,
    enum : {
      values: ENUMS.STATUS,
      message: '{VALUE} is not a valid status'
    },
    default: null,
  },
  /**
   * Number of done stamped on task update
   */
  done: {
    type: Number,
    default: null,
  },
  /**
   * Comment stamped on task update
   */
  comments: {
    type: String,
    default: null,
  },
  /**
   * The one who was responsible and did the task
   */
  responsible: {
    type: Schema.ObjectId, 
    ref: 'users', 
    default: null,
  },
  /**
   * Time used by doing de `done` quantity
   */
  timeused: {
    type: Number,
    required: true
  },
  /**
   * Timestamp. Current Date and Time
   */
  timestamp: {
    type: Date,
    default: new Date(),
  },
})

taskHistorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {      
      id: returnedObject._id,
      task: returnedObject.task,
      taskType: returnedObject.taskType?.id,
      name: returnedObject.taskType?.name,
      status: returnedObject.status,
      quantity: returnedObject.quantity,
      done: returnedObject.done,
      comments: returnedObject.comments,
      responsible: returnedObject.responsible?.username,
      timeused: returnedObject.timeused,
      timestamp: returnedObject.timestamp,
    }
  }
})

const TaskHistory = model('taskHistory', taskHistorySchema)

module.exports = TaskHistory;