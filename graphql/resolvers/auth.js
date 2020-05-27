/* ----------------------------------------------------
Node.js / User resolver for GraphQL

Updated: 05/01/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const bcrypt = require('bcryptjs'); // to encrypt the passwords in the database
const jwt = require('jsonwebtoken'); // to generate JSON web token
const process = require('process');

const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      // Checking whether the email already exists in the database.
      // If not, to encrypt this password and save the new user in the database
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });
      if (existingUser) {
        throw new Error('User exists already');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password,
          parseInt(process.env.BCRYPT));

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();

      return {
        ...result._doc,
        password: null,
        /*    _id: result._doc._id.toSring() */
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ( {email, password}) => {
    const user = await User.findOne({
      email: email,
    });
    // to validate the email whether it exists in the database or not.
    if (!user) {
      throw new Error('User does not exist');
    }
    // to compare password by using bcrypt.
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }
    const token = jwt.sign({
      userId: user.id,
      email: user.email,
    }, process.env.TOKEN, {
      expiresIn: '24h', // CHANGE 1h EXPIRATION INTERVAL!!!
    });
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 24, // CHANGE 1h EXPIRATION INTERVAL!!!
    };
  },
};
