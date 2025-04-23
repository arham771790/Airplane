import {
    createAirport,
    getAirports,
    getAirportWithId,
    destroyAirport,
    updateAirport
  } from "../services/airport-service.js";
  
  import {
    createAirplane,
    getAirplanes,
    getAirplanewithId,
    destroyAirplane,
    updateAirplane
  } from "../services/airplane-service.js";
  
  import {
    createCity,
    getCities,
    getCityWithId,
    destroyCity,
    updateCity
  } from "../services/city-service.js";
  import
  {
    createFlight,
    getFlights,
    getFlightWithId,
    destroyFlight,
    updateFlight
  } from './flight-service.js'
  // Exporting airport-related services
  export { createAirport, getAirports, getAirportWithId, destroyAirport, updateAirport };
  
  // Exporting airplane-related services
  export { createAirplane, getAirplanes, getAirplanewithId, destroyAirplane, updateAirplane };
  
  // Exporting city-related services
  export { createCity, getCities, getCityWithId, destroyCity, updateCity };
  
  export {
    createFlight,
    getFlights,
    getFlightWithId,
    destroyFlight,
    updateFlight};