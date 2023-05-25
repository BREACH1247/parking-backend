const express = require('express')
const HomeRouter = express.Router()
const HomeController = require('../Controllers/Home')


HomeRouter.get('/',HomeController.renderIndexPage)

module.exports = HomeRouter