/* ----------------------------------------------------
Node.js / User resolver for GraphQL

Updated: 06/02/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const bcrypt = require('bcryptjs'); // to encrypt the passwords in the database

const User = require('../../models/user');
const {authFacebook, authGoogle} = require('../../helpers/passport');
const {generateJWT} = require('../../helpers/jwt');
const {sendEmail} = require('../../helpers/nodemailer');
const jwt = require('jsonwebtoken'); // to generate JSON web token

module.exports = {
  createUser: async (args) => {
    try {
      // Checking whether the email already exists in the database.
      // If not, to encrypt this password and save the new user in the database.
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
        confirmed: false,
      });
      const result = await user.save();
      // Send confirmation email.
      sendEmail(result);
      return generateJWT(result);
    } catch (error) {
      throw error;
    }
  },
  login: async ({email, password}) => {
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
    return generateJWT(user);
  },
  authFacebook: async (args, req, res) => {
    const existingUser = await User.findOne({
      email: args.facebookInput.email,
    });
    req.body = {
      ...req.body,
      access_token: args.facebookInput.accessToken,
    };
    try {
      const {data, info} = await authFacebook(req, res);
      if (data) {
        if (existingUser) {
          console.log('existing User', existingUser);
          return generateJWT(existingUser);
        } else {
          const user = new User({
            email: args.facebookInput.email,
            password: null,
            confirmed: null,
          });
          const result = await user.save();
          return generateJWT(result);
        }
      }
      if (info) {
        console.log(info);
        switch (info.code) {
          case 'ETIMEDOUT':
            return (new Error('Failed to reach Facebook: Try again'));
          default:
            return (new Error('Facebook: something went wrong'));
        }
      }
    } catch (error) {
      return error;
    }
  },
  authGoogle: async (args, req, res) => {
    const existingUser = await User.findOne({
      email: args.googleInput.email,
    });
    try {
      const {data, info} = await authGoogle(req, res);
      if (data) {
        if (existingUser) {
          console.log('existing User', existingUser);
          return generateJWT(existingUser);
        } else {
          const user = new User({
            email: args.googleInput.email,
            password: null,
            confirmed: null,
          });
          const result = await user.save();
          return generateJWT(result);
        }
      }
      if (info) {
        console.log(info);
        switch (info.code) {
          case 'ETIMEDOUT':
            return (new Error('Failed to reach Google: Try again'));
          default:
            return (new Error('Google: something went wrong'));
        }
      }
    } catch (error) {
      return error;
    }
  },
  confirmUser: async (args, req, res) => {
    try {
      const decodedToken = jwt.verify(args.confirmInput.emailToken,
          process.env.NODEMAILER_TOKEN);
      await User.findByIdAndUpdate(decodedToken.user, {
        $set: {
          confirmed: true,
        },
      }).exec();
      return {
        msgs: 'User\'s email has been confirmed!',
      };
    } catch (err) {
      throw err;
    }
  },
};
