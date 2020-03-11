/* ----------------------------------------------------
Node.js / Task resolver for GraphQL

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const Task = require('../../models/task');
const { transformTask } = require('../../graphql/resolvers/merge');


module.exports = {
    tasks: async () => {
        try {
            const tasks = await Task.find()
            return tasks.map(task => {
                return transformTask(task);
            });
        } catch (err) {
            throw err;
        }
    },
    createTask: async args => {
        const task = new Task({
            title: args.taskInput.title,
            description: args.taskInput.description,
            price: +args.taskInput.price,
            date: new Date(args.taskInput.date),
            creator: '5e67fa7614a4816f1a6afe11'
        });
        let createdTask;
        try {
            const result = await task.save()
            createdTask = transformTask(result);
            const creator = await User.findById('5e67fa7614a4816f1a6afe11');

            // Checking whether the user who is creating this task exists in the database. 
            // If yes, we push this task to user's data and update it
            if (!creator) {
                throw new Error('User not found');
            }
            creator.createdTasks.push(task); //createdTasks from user.js/userSchema
            await creator.save();

            return createdTask;
        } catch (err) {
            console.log(err);
            throw err;
        };
    }
};