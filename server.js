const express = require('express')
var cookies = require("cookie-parser");
const app= express();
const homeRouter = require('./Routes/HomeRoute')
const authRouter = require('./Routes/AuthRoute')
const {vehicleRouter} = require('./Routes/VehicleRoute')
const sequelize = require('./db')
const User = require('./Models/UserModel')

const {ParkingSpotModel} = require("./models/parkingSpot");
const logRouter = require("./Routes/Log");
const {LogModel} = require("./models/log");


const spotNames = ['Parking Spot 1', 'Parking Spot 2', 'Parking Spot 3', 'Parking Spot 4', 'Parking Spot 5'];
const spotAddresses = ['Address 1', 'Address 2', 'Address 3', 'Address 4', 'Address 5'];

sequelize.sync({ force: true })
  .then(async result => {
    for (let i = 0; i < 5; i++) {
      await ParkingSpotModel.create({
        name: spotNames[i],
        address: spotAddresses[i]
      });
    }
    console.log('Data inserted successfully!');
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  });


const PORT = 3002
app.use(express.json())
app.use(cookies())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')


app.use('/',homeRouter)
app.use('/auth',authRouter)
app.use('/vehicle',vehicleRouter)
app.use('/log',logRouter)

app.listen(PORT,()=>{
    console.log(`Running on http://localhost:${PORT}`)
});