const express = require('express');
const AuthRouter = express.Router();

const AuthPath = require('../Controllers/Auth');

AuthRouter.get('/', AuthPath.renderAuthPage);
AuthRouter.post('/login', AuthPath.loginUser);
AuthRouter.post('/register', AuthPath.registerUser);
AuthRouter.get('/logout/',AuthPath.logoutUser)

module.exports = AuthRouter;
