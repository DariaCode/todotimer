# ToDoTimer
<<<<<<< HEAD
This app is built by using:
- Node.js/express
- GraphQL
- MongoDB/mongoose
- React.js
![](img/laptop.png)

**Demo vid:**  
[https://dariacode.dev](https://dariacode.dev)

**Design system:**  
[https://github.com/DariaCode/todotimer](https://github.com/DariaCode/todotimer)

## Current application state

The current version of this app provides for a user: 
- Create an account(Signup) and log in,
- create task:
 - title,
 - priority(optional),
 - date(optional),
 - repeat(optional),
- edit task, 
- delete task.

User can use a sidebar to manage displaying tasks by paraments(All Task, Today, Next 7 Days, Completed). The ToDoTimer allows seeing statistics of completions. 

All users information stored into [MongoDB](https://www.mongodb.com/). Application ensure a secure way to store password ( [bcryptjs](https://www.npmjs.com/package/bcryptjs) ) and  authorization (JSON Web Tokens - [JWT](https://jwt.io/)).

### Installing

To install all dependencies required for the project, clone or download the source `cd` into the project root and from your terminal run:

```bash
npm install
```
### Local development

The project uses [Create React App](https://facebook.github.io/create-react-app/), which includes a local development server `cd` into the project root and run the following command from the terminal:

```bash
npm start
```