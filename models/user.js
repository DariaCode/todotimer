/* ----------------------------------------------------
Node.js / User's schema for MongoDB

Updated: 06/02/2020
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
    required: false,
  },
  confirmed: {
    type: Boolean,
    required: false,
  },
  createdTasks: [ // array
    {
      // to store all tasks' IDs which this user have created
      type: Schema.Types.ObjectId,
      // the module from task.js
      ref: 'Task',
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
