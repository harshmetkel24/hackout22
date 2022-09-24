const express = require('express');
const User = require('../Models/User');
const Bus=require('../models/Bus')
const BusStop=require('../models/BustStop')
const router = express.Router();
const Graph=require('../Route_map/Graph')
const buslist=require('../Route_map/buslist.json')
let graph=Graph()
router.get('/predict',async (req,res)=>{
    // return karna optimal choices
    let source=req.body.source
    let dest=req.body.destination
    let wait_time=req.body.wait_time
    let ctime=req.body.current_time
    let stops_list=graph.Get_stops_list(source,dest,wait_time)
    let buses_list=[]
    for(let i in stops_list)
    {
        let stop_id=stops_list[i]
        let stop=await BusStop.findOne({id:stop_id})
        if(stop==null) continue;
        let cbus_list=stop.bus_list
        for(let j in cbus_list)
        {
            let bus_id=cbus_list[j]
            // check the bus with this bus  id
            let cbus=await Bus.findOne({bus_no:bus_id})
            if(cbus==null) continue;
            if(cbus.available_seats==0) continue;
            let xind=buslist[bus_id-1][source][0]
            let yind=buslist[bus_id-1][dest][0]
            let t1=buslist[bus_id-1][source][1]
            if(xind>yind || t1-ctime>wait_time)
            continue;
            buses_list.push(bus_id)
        }
    }
    //buses list
    let earliest=buses_list,least_time=[...buses_list];

    least_time.sort(function(a,b){
        return (buslist[a-1][dest][1]-buslist[a-1][source][1])<(buslist[b-1][dest][1]-buslist[b-1][source][1])
    })
    earliest.sort(function(a,b){
        return buslist[a-1][source][1]<buslist[b-1][source][1]
    })
    res.status(200).json({buses_list:buses_list})
})

module.exports = router;

