const { LogModel } = require("../Models/LogModel");

const getLogs = async (req, res) => {
    const logs = await LogModel.findAll();
    res.render('LogView', {
        logs: logs
    });
};

const checkIn = async (vehicleId, userId, parkingSpotId) => {
    console.error(parkingSpotId);
    const log = await LogModel.create({
        vehicleId: vehicleId,
        userId: userId,
        parkingSpotId: parkingSpotId,
        checkInTime: Date.now()
    });
};

const checkOut = async (vehicleId) => {
    const log = await LogModel.findOne({
        where: {
            vehicleId: vehicleId
        }
    });
    log.checkOutTime = new Date();
    log.duration = log.checkOutTime - log.checkInTime;
    await log.save();
};

module.exports = {
    getLogs,
    checkIn,
    checkOut
};