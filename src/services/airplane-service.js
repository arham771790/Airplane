import { AirplaneRepo } from "../repositories/index.js";
const airplaneRepository = new AirplaneRepo();
export const createAirplane=async (data)=>{
    try{
        const newAirplane = await airplaneRepository.create(data);
        return newAirplane;
    }
    catch(error){
        console.error("Error creating airplane: ", error);
        return { error: true, message: error.message };
    }

}
