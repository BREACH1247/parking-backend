const { VehicleModel } = require("../Models/VehicleModel");
const { parkingSpotController } = require("./Parking");
const { logController } = require("./Log");

// Function to handle GET request
async function getVehicles(req, res) {
    const vehicle = await VehicleModel.findAll({
        where: {
            userId: req.user.userId
        }
    });
    res.render('VehicleView', {
        vehicle: vehicle,
        parkingSpots: await parkingSpotController.getParkingSpots()
    });
}

// Function to handle POST request for adding a vehicle
async function addVehicle(req, res) {
    const isVehicleParked = await VehicleModel.findOne({
        where: {
            vehicleNumber: req.body.vehicleNumber
        }
    });
    if (isVehicleParked) return res.status(409).json({ error: "Vehicle not at any parking" });
    const vehicle = await VehicleModel.create({
        userId: req.user.userId,
        vehicleNumber: req.body.vehicleNumber
    });
    logController.checkIn(vehicle.vehicleId, req.user.userId, req.body.parkingSpotId);
    return res.redirect('/vehicle/');
}

// Function to handle POST request for deleting a vehicle
async function deleteVehicle(req, res) {
    await VehicleModel.destroy({
        where: {
            vehicleId: req.body.vehicleId,
            userId: req.user.userId
        },
        force: true
    });
    logController.checkOut(req.body.vehicleId);
    return res.redirect('/vehicle/');
}

// Exporting the functions
module.exports = {
    getVehicles,
    addVehicle,
    deleteVehicle
};


