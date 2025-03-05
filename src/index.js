import { ServerConfig,Logger } from "./config/index.js";
import express from "express";
import apiRoutes from "../src/routes/index.js"
const app = express();

app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,()=>{
    console.log(`Server running on port ${ServerConfig.PORT}`);
    Logger.info(`Successfully started server on port ${ServerConfig.PORT}`,"root",{});
});