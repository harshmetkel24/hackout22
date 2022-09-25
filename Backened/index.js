// const modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
var cron = require("node-cron");
const buslist = require("./Route_map/buslist.json");
const cookieParser = require("cookie-parser");
// const routes
const authRoute = require("./Routes/Auth.js");
const busRoute = require("./Routes/bus_routes.js");
const Feedback = require("./Models/Feedback");

const app = express();
dotenv.config();

// Auto connect for database
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("Database connected!");
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Use routes
app.use("/auth", authRoute);

// Add find functionality
app.use("/find", busRoute);

app.post("/feedback", (req, res, next) => {
  const mobile = req.body.mobile;
  const message = req.body.message;
  const feedback = new Feedback({
    mobile: mobile,
    message: message,
  });
  feedback
    .save()
    .then((result) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      next(err);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatusCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  const information = err.stack;
  res.status(errorStatusCode).json({
    success: false,
    status: errorStatusCode,
    message: errorMessage,
    Information: information,
  });
});

let previous_time = 0,
  current_time = 0;

cron.schedule("*/2 * * * *", async function() {
  // */2 * * * *
  current_time += 10;
  let buses = await Bus.find();
  for (let x in maps) {
    let rand = 10 + Math.floor(Math.random() * 5);
    // console.log(rand)
    await BusStop.findOneAndUpdate({ id: x }, { $inc: { Passengers: rand } });
  }
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
    // console.log(buses[i].bus_no, station_before, station_after)
    if (station_before != station_after) {
      let cbustop = await BusStop.findOne({ id: station_before });
      let cbus = await Bus.findOne({ bus_no: buses[i].bus_no });
      let cbuslist = cbustop.bus_list;
      cbuslist = cbuslist.filter((x) => x != cbus.bus_no);
      if (cbus.available_seats >= cbustop.Passengers) {
        cbus.available_seats -= cbustop.Passengers;
        cbustop.Passengers = 0;
      } else {
        cbustop.Passengers -= cbus.available_seats;
        cbus.available_seats = 0;
      }

      await BusStop.findOneAndUpdate(
        { id: station_before },
        { bus_list: cbuslist, Passengers: cbustop.Passengers }
      ).then((res) => {
        // if (before != bst)
        // console.log(res, before, bst)
      });
      await Bus.findOneAndUpdate(
        { bus_no: cbus.bus_no },
        { available_seats: cbus.available_seats }
      );

      cbustop = await BusStop.findOne({ id: station_after });
      if (cbustop != null) {
        cbuslist = cbustop.bus_list;
        // before = [...bst]
        cbuslist.push(cbus.bus_no);
        await BusStop.findOneAndUpdate(
          { id: station_after },
          { bus_list: cbuslist }
        ).then((res) => {
          // if (before != bst)
          //     console.log(res, before, bst)
        });
      }
    }
  }
  previous_time = current_time;
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/", function(req, res) {
    app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
}

// Start server
const maps = require("./Route_map/station_names.json");
const BusStop = require("./models/BustStop.js");
const Bus = require("./models/Bus.js");
app.listen(process.env.PORT || 8000, () => {
  // Database connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log("Database connected!");
      Start_Stations();
      console.log("Backend connected! Port :", process.env.PORT);
    })
    .catch((error) => {
      console.log(error);
      console.log("Database is not connected!");
    });
});

async function Start_Stations() {
  for (let st in maps) {
    BusStop.findOneAndUpdate({ id: st }, { bus_list: [], Passengers: 0 }).then(
      (res) => {
        // console.log("updated")
      }
    );
  }
  for (let x in buslist) {
    await Bus.findOneAndUpdate(
      { bus_no: Number.parseInt(x) + 1 },
      { available_seats: 50 }
    );
  }
  // return;
  let st_bus_list = {};
  for (let x in buslist) {
    let key = Object.keys(buslist[x]).find((k) => buslist[x][k][1] == 0);
    if (st_bus_list[key]) st_bus_list[key].push(Number.parseInt(x) + 1);
    else {
      st_bus_list[key] = [Number.parseInt(x) + 1];
    }
  }
  // console.log(st_bus_list)
  for (let st in st_bus_list) {
    BusStop.findOneAndUpdate({ id: st }, { bus_list: st_bus_list[st] }).then(
      (res) => {
        // console.log("updated")
      }
    );
  }
}

// for(let i in buslist)
// {
//     let temparr=Object.keys(buslist[i])
//     temparr.sort((a,b)=>{
//         return buslist[i][a][0]-buslist[i][b][0]
//     })
//     // console.log(temparr)
//     temparr=temparr.map(x=>{
//         return Number.parseInt(x)
//     })
//     console.log(temparr)
//     let bus=await Bus.create({
//         bus_no:Number.parseInt(i)+1,
//         path:temparr,
//         start_time:8*60,
//         available_seats:50
//     })
// }

// for(x in maps)
// {
//     let temp=await BusStop.create({
//         name:maps[x]
//         ,
//         id:Number.parseInt(x),
//         Passengers:0,
//         bus_list:[]
//     })

// }
