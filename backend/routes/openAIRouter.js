const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { openAIController } = require('../controllers/openAIController');
const openAIRouter = express.Router();

openAIRouter.post('/generate', isAuthenticated,openAIController);

module.exports = openAIRouter;