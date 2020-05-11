# ToDoTimer
![](img/laptop.png)

**Demo video:**  
[https://dariacode.dev](https://dariacode.dev)

**Design system:**  
[https://github.com/DariaCode/todotimer](https://github.com/DariaCode/todotimer)

### Current application state

The current version of this web app with responsive UI provides for user to: 
- Create an account(Signup) and log in,
- create task:
  - title,
  - priority(optional),
  - date(optional),
  - repeat(optional),
- edit task, 
- delete task.

User can use a sidebar to manage displaying tasks by paraments(All Task, Today, Next 7 Days, Completed). The ToDoTimer allows seeing statistics of completions. 

All users information stored into [MongoDB](https://www.mongodb.com/). The application ensure a secure way to store password ( [bcryptjs](https://www.npmjs.com/package/bcryptjs) ) and  authorization (JSON Web Tokens - [JWT](https://jwt.io/)).

### Install and Run

To install all dependencies required for the project, clone or download the source `cd` into the project root and from your terminal run:

```bash
git clone https://github.com/DariaCode/todotimer
cd todotimer
npm i
npm run start
open localhost:8000
```
and run frontend (React.js):
```bash
cd frondend
npm run start
open localhost:3000
```

### Built with

- [React](https://reactjs.org/) - JavaScript UI development library.
- [React Router DOM](https://reacttraining.com/react-router/web/guides/quick-start) - Routing library for React.
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
- [GraphQL](https://graphql.org/) - An open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
- [MongoDB](https://www.mongodb.com/) - A cross-platform document-oriented database program.

### Author

Built by Daria Vodzinskaia - [DariaCode](https://dariacode.dev)

### License

This project is licensed under the GPL v3 License - see the [LICENSE.md](https://github.com/DariaCode/todotimer/blob/master/LICENSE) file for details
