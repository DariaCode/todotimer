/* ----------------------------------------------------
Node.js / Schema for GraphQL

Updated: 05/01/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

const {buildSchema} = require('graphql');

module.exports = buildSchema(` 
type Task {
    _id: ID! 
    title: String!
    priority: Float!
    date: String
    complete: Boolean!
    start: String
    end: String
    intervalK: Float
    intervalN: String
    creator: User!
} 

type User {
    _id: ID!
    email: String!
    password: String
    createdTasks: [Task!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input TaskInput {
    title: String!
    priority: Float!
    date: String
    complete: Boolean!
    start: String
    end: String
    intervalK: Float
    intervalN: String
}

input UpdateTaskInput {
    title: String
    priority: Float
    date: String
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    tasks: [Task!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
    createUser(userInput: UserInput): User
    cancelSending(sendingId: ID!): Task!
    updateTask(taskId: ID!, taskInput: UpdateTaskInput): Task!
    completeTask(taskId: ID!): Task!
    deleteTask(taskId: ID!): Task!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
