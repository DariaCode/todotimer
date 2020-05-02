/* ----------------------------------------------------
Node.js / User's schema for MongoDB

Updated: 05/01/2020
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
      // to store all tasks' IDs which this user have created
      type: Schema.Types.ObjectId,
      // the module from task.js
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
