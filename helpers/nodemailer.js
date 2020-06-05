/* eslint-disable require-jsdoc */
/* ----------------------------------------------------
Node.js / Confirmation Email

Updated: 06/05/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const jwt = require('jsonwebtoken'); // to generate JSON web token
const nodemailer = require('nodemailer');

// eslint-disable-next-line require-jsdoc
async function sendEmail(user) {
  // Create reusable transporter object using the default SMTP transport.
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const emailToken = jwt.sign({
    user: user.id,
    email: user.email,
  }, process.env.NODEMAILER_TOKEN, {
    expiresIn: '7d',
  });

  const url = `http://localhost:3000/confirm/${emailToken}`;

  const output = `<div>Hey,</br>
  Welcome to ToDoTimer, your simple and flexible to-do list for work,</br>
  home and everywhere else.</br> 
  Please confirm your email address to get full access to ToDoTimer.</div> 
    <a href="${url}">Confirm Now</a>
    <div>Thanks for being part of ToDoTimer:)</div>`;

  // Send mail with defined transport object.
  const info = await transporter.sendMail({
    from: '"todotimer 👻" <dariacodedev@gmail.com>',
    to: user.email,
    subject: 'Confirm your email',
    html: output,
  });
  console.log('Message sent: %s', info.messageId);
};

module.exports = {
  sendEmail,
};
