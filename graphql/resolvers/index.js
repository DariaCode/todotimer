/* ----------------------------------------------------
Node.js / Resolvers for GraphQL

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const bcrypt = require('bcryptjs'); //to encrypt the passwords in the database

const Task = require('../../models/task');
const User = require('../../models/user');
const Sending = require('../../models/sending');

// tasks() and user() help to avoid infinite loop
// $in is the special operator in mongoDB syntax
// to find all tasks with id
const tasks = async taskIds => {
    try {
        const tasks = await Task.find({
            _id: {
                $in: taskIds
            }
        });
        tasks.map(task => {
            return {
                ...task._doc,
                _id: task.id,
                date: new Date(task._doc.date).toISOString(),
                creator: user.bind(this, task.creator)
            };
        });
        return tasks;
    } catch (err) {
        throw err;
    }
};

// This function acts like .population(), mongoose's method that adds relation
// In this case - user's(creator's) info to the task
const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdTasks: tasks.bind(this, user._doc.createdTasks),
            password: null
        };
    } catch (err) {
        throw err;
    }
};

// A function for sending tasks
const singleTask = async taskId => {
    try {
        const task = await Task.findById(taskId);
        return {
            ...task._doc,
            _id: task.id,
            creator: user.bind(this, task.creator)
        }
    } catch (err) {
        throw err;
    }
};

module.exports = {
    tasks: async () => {
        try {
            const tasks = await Task.find()
            return tasks.map(task => {
                return {
                    ...task._doc,
                    _id: task.id,
                    date: new Date(task._doc.date).toISOString(),
                    creator: user.bind(this, task._doc.creator)
                };
            });
        } catch (err) {
            throw err;
        }
    },
    sendings: async () => {
        try {
            const sendings = await Sending.find();
            return sendings.map(sending => {
                return {
                    ...sending._doc,
                    _id: sending.id,
                    user: user.bind(this, sending._doc.user),
                    task: singleTask.bind(this, sending._doc.task),
                    createdAt: new Date(sending._doc.createdAt).toISOString(),
                    updatedAt: new Date(sending._doc.updatedAt).toISOString()
                };
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
            createdTask = {
                ...result._doc,
                /*  _id: result._doc._id.toSring(), */
                date: new Date(task._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            }
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
    },
    createUser: async args => {
        try {
            // Checking whether the email already exists in the database. 
            // If not, to encrypt this password and save the new user in the database 
            const existingUser = await User.findOne({
                email: args.userInput.email
            });
            if (existingUser) {
                throw new Error('User exists already')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 9)

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const result = await user.save();

            return {
                ...result._doc,
                password: null,
                /*    _id: result._doc._id.toSring() */
            };
        } catch (err) {
            throw err;
        };
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
        return {
            ...result._doc,
            _id: result.id,
            user: user.bind(this, result._doc.user),
            task: singleTask.bind(this, result._doc.task),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        };
    },
    cancelSending: async args => {
        try {
            const sending = await Sending.findById(args.sendingId).populate('task');
            const task = {
                ...sending.task._doc,
                _id: sending.task.id,
                creator: user.bind(this, sending.task._doc.creator)
            };
            console.log(task);
            await Sending.deleteOne({
                _id: args.sendingId
            });
            return task;
        } catch (err) {
            throw err;
        };
    }
};