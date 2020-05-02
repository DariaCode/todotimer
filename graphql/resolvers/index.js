/* ----------------------------------------------------
Node.js / Resolvers for GraphQL

Updated: 05/01/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const authResolver = require('./auth');
const tasksResolver = require('./tasks');

const rootResolver = {
  ...authResolver,
  ...tasksResolver,
};

module.exports = rootResolver;
