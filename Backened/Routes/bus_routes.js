const express = require('express');
const User = require('../Models/User');
const Bus = require('../models/Bus')
const BusStop = require('../models/BustStop')
const router = express.Router();
const Graph = require('../Route_map/Graph')
const buslist = require('../Route_map/buslist.json')
let graph = new Graph()
router.post('/predict', async (req, res) => {
    // return karna optimal choices
    console.log(req.body)
    let source = req.body.source
    let dest = req.body.destination
    let wait_time = req.body.wait_time
    console.log(source, dest, wait_time)
    let stops_list = graph.Get_stops_List(source, dest, wait_time)
    console.log("Stops list ", stops_list)
    let buses_list = []
    for (let i in stops_list) {
        let stop_id = stops_list[i]
        let stop = await BusStop.findOne({ id: stop_id })
        if (stop == null) continue;
        let cbus_list = stop.bus_list
        for (let j in cbus_list) {
            let bus_id = cbus_list[j]
            // check the bus with this bus  id
            let cbus = await Bus.findOne({ bus_no: bus_id })
            if (cbus == null) continue;
            if (cbus.available_seats == 0) continue;
            // console.log(bus_id)
            let xind = buslist[bus_id - 1][source]
            let yind = buslist[bus_id - 1][dest]
            if (!xind || !yind) continue;
            xind = xind[0]
            yind = yind[0]
            let t1 = buslist[bus_id - 1][source][1]
            if (xind > yind ||(t1*10)> wait_time)
                continue;
            buses_list.push([bus_id,t1*10])
        }
    }
    console.log(buses_list)
    //buses list
    buses_list = [... new Set(buses_list)]
    let earliest = buses_list, least_time = [...buses_list];

    least_time.sort(function (a, b) {
        return (buslist[a[0] - 1][dest][1] - buslist[a[0] - 1][source][1]) < (buslist[b[0] - 1][dest][1] - buslist[b[0] - 1][source][1])
    })
    earliest.sort(function (a, b) {
        return buslist[a[0]- 1][source][1] < buslist[b[0] - 1][source][1]
    })

    res.status(200).json({ least_time: least_time, earliest: earliest })
})

module.exports = router;

