const express = require('express')
const VehicleRoute = express.Router()
const vehicleControl = require('../Controllers/Vehicle')
const {auth} = require("../MiddlewareLogic/jwt");

VehicleRoute.get('/',auth,vehicleControl.getVehicles)


module.exports = VehicleRoute