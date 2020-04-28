/* ----------------------------------------------------
Node.js / Resolvers for GraphQL

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const authResolver = require('./auth');
const tasksResolver = require('./tasks');
const sendingResolver = require('./sending');

const rootResolver = {
  ...authResolver,
  ...tasksResolver,
  ...sendingResolver,
};

module.exports = rootResolver;
