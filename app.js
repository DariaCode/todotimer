/* ----------------------------------------------------
Node.js / Express server for timer app

Updated: 03/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true // for testing
}));

/*
MUST CHANGE IT!!!!!
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mthik.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`);
*/

mongoose.connect(`mongodb+srv://dariacode:Willy1109@cluster0-mthik.gcp.mongodb.net/timer-app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successful database connection");
    app.listen(3000, () => {
        console.log("Listening on port ...");
    });
}).catch(err => {
    console.log("Database error: " + err);
});