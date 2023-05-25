const express = require('express')
const LogRouter = express.Router()
const {auth} = require("../MiddlewareLogic/jwt");
const {LogControl} = require("../Controllers/Log");

LogRouter.get('/',auth,LogControl.get)

exports.LogRouter = LogRouter