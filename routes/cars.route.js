const express = require("express");
const carService = require("../controllers/cars.controller");

const router = express.Router();

router.get("/", carService.getCars);
router.get("/:id", carService.getCarById);
router.post("/", carService.createCar);
router.put("/:id", carService.updateCar);
router.delete("/:id", carService.deleteCar);

module.exports = router;
