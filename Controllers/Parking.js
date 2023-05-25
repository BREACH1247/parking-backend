const { ParkingSpotModel } = require("../Models/ParkingSpotModel");

exports.parkingSpot = {};

exports.parkingSpot.getParkingSpotId = async () => {
    const parkingSpotIds = await ParkingSpotModel.findAll({
        attributes: ['parkingSpotId,name']
    });
    return parkingSpotIds.map(parkingSpot => parkingSpot.parkingSpotId);
};


module.exports = exports;