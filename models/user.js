/* ----------------------------------------------------
Node.js / User's schema for MongoDB
Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdTasks: [ // array
    {
      type: Schema.Types.ObjectId, // to store all tasks' IDs which this user have created
      ref: 'Task', // the module from task.js
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
