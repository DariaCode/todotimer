/* ----------------------------------------------------
Node.js / Sending Task schema for MongoDB
Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sendingSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId, // to store all tasks' IDs which this user have created
        ref: 'Task' //the module from task.js
    },
    user: {
        type: Schema.Types.ObjectId, // to store all users' IDs which this user have created
        ref: 'User' //the module from user.js
    },
}, {
    timestamps: true // to add created_at and updated_at fields to a mongoose schema
});

module.exports = mongoose.model('Sending', sendingSchema);