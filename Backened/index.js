// const modules
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
var cron = require('node-cron')
const buslist = require('./Route_map/buslist.json')
const cookieParser = require('cookie-parser')
// const routes
const authRoute = require('./Routes/Auth.js')
const busRoute = require('./Routes/bus_routes.js')

const app = express();
dotenv.config();

// Auto connect for database
mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected!")
})
mongoose.connection.on("connected", () => {
    console.log("Database connected!")
})


// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// Use routes
app.use("/auth", authRoute);

// Add find functionality
app.use('/find', busRoute);
// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    const information = err.stack;
    res.status(errorStatusCode).json({
        success: false,
        status: errorStatusCode,
        message: errorMessage,
        Information: information
    })
})

let previous_time = 0, current_time = 0;

cron.schedule("*/2 * * * *", async function () {
  // */2 * * * *
  current_time += 10;
  let buses = await Bus.find();
  for (let i in buses) {
    let station_before = -1,
      station_after = -1;
    for (let j in buses[i].path) {
      let ct = buslist[buses[i].bus_no - 1][buses[i].path[j]][1] * 60;
      if (ct > previous_time && station_before == -1)
        station_before = buses[i].path[j];
      if (ct > current_time && station_after == -1)
        station_after = buses[i].path[j];
    }
    console.log(buses[i].bus_no, station_before, station_after);
    if (station_before != station_after) {
      let bst = await BusStop.findOne({ id: station_before });
      bst = bst.bus_list;
      let before = [...bst];
      bst = bst.filter((x) => x != buses[i].bus_no);
      await BusStop.findOneAndUpdate(
        { id: station_before },
        { bus_list: bst }
      ).then((res) => {
        if (before != bst) console.log(res, before, bst);
      });
      bst = await BusStop.findOne({ id: station_after });
      if (bst != null) {
        bst = bst.bus_list;
        before = [...bst];
        bst.push(buses[i].bus_no);
        await BusStop.findOneAndUpdate(
          { id: station_after },
          { bus_list: bst }
        ).then((res) => {
          if (before != bst) console.log(res, before, bst);
        });
      }
    }
  }
  previous_time = current_time;
});
// Start server
const maps = require('./Route_map/station_names.json');
const BusStop = require('./models/BustStop.js');
const Bus = require('./models/Bus.js');
app.listen(process.env.PORT || 8000, () => {
    Start_Stations()
    // Database connection
    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log("Database connected!")
            console.log("Backend connected! Port :", process.env.PORT)

        })
        .catch((error) => {
            console.log(error)
            console.log("Database is not connected!")
        })
})

async function Start_Stations() {
    for (let st in maps) {
        BusStop.findOneAndUpdate({ id: st }, { bus_list: [] })
            .then(res => {
                console.log("updated")
            })
    }
    // return;
    let st_bus_list = {}
    for (let x in buslist) {
        let key = Object.keys(buslist[x]).find(k => buslist[x][k][1] == 0);
        if (st_bus_list[key])
            st_bus_list[key].push(Number.parseInt(x) + 1)
        else {
            st_bus_list[key] = [Number.parseInt(x) + 1]
        }
    }
    console.log(st_bus_list)
    for (let st in st_bus_list) {
        BusStop.findOneAndUpdate({ id: st }, { bus_list: st_bus_list[st] })
            .then(res => {
                console.log("updated")
            })
    }
}