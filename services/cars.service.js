const { createClient } = require("@supabase/supabase-js");
const env = require("dotenv");

env.config();
const supabaseUrl = process.env.URL;
const supabaseKey = process.env.KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
exports.getCars = async () => {
  try {
    const { data, error } = await supabase.from("cars").select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

exports.createCar = async (carData) => {
  try {
    const { data, error } = await supabase.from("cars").insert([carData]);
    if (error) throw error;
    return data[0]; // Return the newly created car
  } catch (error) {
    throw error;
  }
};

exports.updateCar = async (id, carData) => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .update({
        name: carData.name ? carData.name : undefined, // Update only provided fields
        description: carData.description ? carData.description : undefined,
        price: carData.price ? carData.price : undefined,
      })
      .eq("id", id);
    if (error) throw error;
    return data[0]; // Return the updated car
  } catch (error) {
    throw error;
  }
};

exports.deleteCar = async (id) => {
  try {
    const { data, error } = await supabase.from("cars").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

exports.getCarById = async (id) => {
  try {
    const { data, error } = await supabase.from("cars").select().eq("id", id);
    if (error) throw error;
    return data[0]; // Return the car with the specified ID
  } catch (error) {
    throw error;
  }
};
