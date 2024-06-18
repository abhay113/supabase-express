const carService = require("../services/cars.service"); // Import car service

exports.index = (req, res) => {
  res.send("Hello from the car service!");
};

exports.getCars = async (req, res) => {
  try {
    const cars = await carService.getCars();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const newCar = await carService.createCar(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await carService.updateCar(req.params.id, req.body);
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await carService.deleteCar(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await carService.getCarById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
