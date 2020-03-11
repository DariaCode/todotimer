/* ----------------------------------------------------
Node.js / User resolver for GraphQL

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const bcrypt = require('bcryptjs'); //to encrypt the passwords in the database

const User = require('../../models/user');

module.exports = {
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
    }
};