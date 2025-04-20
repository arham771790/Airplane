import express from "express";
const router = express.Router();

import {
  createCity,
  getCities,
  getCityWithId,
  destroyCity,
  updateCity,
} from "../../controllers/city.controller.js"; // Make sure this path is correct

import { validateCityRequest } from "../../middlewares/city-create-middleware.js"; // Make sure this is correct

console.log("Inside city routes");

// Define the routes
router.post('/', validateCityRequest, createCity); // POST route for creating a city
router.get('/:id', getCityWithId); // GET route for fetching city by ID
router.get('/', getCities); // GET route for fetching all cities
router.delete('/:id', destroyCity); // DELETE route for deleting a city by ID
router.put('/:id', updateCity); // PUT route for updating a city by ID

export default router;
