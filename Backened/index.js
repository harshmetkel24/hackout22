// const modules
const express = require ('express')
const mongoose = require ('mongoose')
const dotenv = require ('dotenv');
const cors = require ('cors');
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
app.use("/auth",authRoute);

// Add find functionality
app.use('/find',busRoute);
// Error handling middleware
app.use((err,req,res,next) => {
    const errorStatusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    const information = err.stack;
    res.status(errorStatusCode).json({
        success : false,
        status : errorStatusCode,
        message : errorMessage,
        Information : information
    })
})

// Start server
app.listen(process.env.PORT || 8000,() => {

    // Database connection
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected!")
        console.log("Backend connected! Port :" , process.env.PORT)
    })
    .catch((error) => {
        console.log(error)
        console.log("Database is not connected!")
    })
})
