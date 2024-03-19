const express = require('express');
const { register, login, logout } = require('../controllers/UsersController');
const usersRouter = express.Router();


usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);

module.exports = usersRouter;