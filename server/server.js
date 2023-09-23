const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const cors = require('cors');
const session = require('express-session');
const LoginController = require('./controllers/LoginController');
const LogOutController = require('./controllers/LogOutController');
const RegisterUserController = require('./controllers/RegisterUserController');
const AddTaskController = require('./controllers/AddTaskController');
const GetTasksController = require('./controllers/GetTasksController');
const GetUsersController = require('./controllers/GetUsersController');
const DeleteTaskController = require('./controllers/DeleteTaskController');
const UpdateTaskController = require('./controllers/UpdateTaskController');

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Database connection is successful');
  })
  .catch((err) => {
    console.log('Error when connecting to the database' + err);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: '2dG$9LzR#s5A@pXv!FwC1mKqY', 
    resave: false, 
    saveUninitialized: false, 
  })
);


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  next();
};

app.use((req, res, next) => {
  if (req.path === '/login') {
    next();
  } else {
    authenticateJWT(req, res, next);
  }
});

app.post('/login', async (req, res) => {
  return await LoginController.userLogin(req, res);
});

app.post('/logoutuser', async (req, res) => {
  return await LogOutController.userLogOut(req, res);
});

app.post('/registeruser', async (req, res) => {
  return await RegisterUserController.registerUser(req, res);
});

app.post('/addtask', async (req, res) => {
  return await AddTaskController.createTask(req, res);
});

app.post('/gettasks', async (req, res) => {
  return await GetTasksController.getTasks(req, res);
});

app.get('/getusers', async (req, res) => {
  return await GetUsersController.getUsers(req, res);
});

app.delete('/deletetask', async (req, res) => {
  return await DeleteTaskController.deleteTask(req, res);
});

app.put('/updatetask', async (req, res) => {
  return await UpdateTaskController.updateTask(req, res);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
module.exports;