/* ----------------------------------------------------
Node.js / Sending resolver for GraphQL

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const Task = require('../../models/task')
const Sending = require('../../models/sending');
const { transformTask, transformSending} =require('./merge');



module.exports = {
    sendings: async () => {
        try {
            const sendings = await Sending.find();
            return sendings.map(sending => {
                return transformSending(sending);
            });
        } catch (err) {
            throw err;
        }
    },
    sendTask: async args => {
        const fetchedTask = await Task.findOne({
            _id: args.taskId
        });
        const sending = new Sending({
            user: '5e67fa7614a4816f1a6afe11',
            task: fetchedTask
        });
        const result = await sending.save();
        return transformSending(result);
    },
    cancelSending: async args => {
        try {
            const sending = await Sending.findById(args.sendingId).populate('task');
            const task = transformTask(sending.task);
            await Sending.deleteOne({
                _id: args.sendingId
            });
            return task;
        } catch (err) {
            throw err;
        };
    }
};