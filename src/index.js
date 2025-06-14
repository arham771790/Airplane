import { ServerConfig,Logger } from "./config/index.js";
import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "../src/routes/index.js"
import path  from "path";
const app = express();
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded
app.use(bodyParser.json()); 
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,()=>{
    console.log(`Server running on port ${ServerConfig.PORT}`);
    Logger.info(`Successfully started server on port ${ServerConfig.PORT}`,"root",{});
}); 
