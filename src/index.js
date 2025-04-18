import { ServerConfig,Logger } from "./config/index.js";
import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "../src/routes/index.js"
const app = express();
app.use(express.json());
app.use(bodyParser.json()); 
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,()=>{
    console.log(`Server running on port ${ServerConfig.PORT}`);
    Logger.info(`Successfully started server on port ${ServerConfig.PORT}`,"root",{});
});