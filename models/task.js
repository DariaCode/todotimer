/* ----------------------------------------------------
Node.js / Task's schema for MongoDB
Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date
    },
    complete: {
        type: Boolean,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User' //the module from user.js
    }
});

module.exports = mongoose.model('Task', taskSchema);