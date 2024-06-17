import express from "express";
import morgan from "morgan";
import { createClient } from "@supabase/supabase-js";
import env from "dotenv";
import e from "express";

env.config();
const app = express();
const PORT = process.env.PORT;

// Using morgan for logs
app.use(morgan("combined"));

// Parsing JSON bodies (Express 4.16.0 and higher)
app.use(express.json());

const supabaseUrl = "https://zytsehdoscrgcuuvuijf.supabase.co";
const supabaseKey = process.env.KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/cars", async (req, res) => {
  try {
    const { data, error } = await supabase.from("cars").select();
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});

app.post("/cars", async (req, res) => {
  try {
    const { data, error } = await supabase.from("cars").insert({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    res.status(201).send(data);
  } catch (error) {}
});

app.put("/cars/:id", async (req, res) => {
  try {
    const { data: updatedData, error: error } = await supabase
      .from("cars")
      .update({
        name: req.body.name ? req.body.name : updatedData[0].name,
        description: req.body.description
          ? req.body.description
          : updatedData[0].description,
        price: req.body.price ? req.body.price : updatedData[0].price,
      })
      .eq("id", req.params.id);

    const { data, err } = await supabase.from("cars").select();
    return response.status(200).send(data);
  } catch (error) {}
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .delete()
      .eq("id", req.params.id);

    res.send({ "message ": "deleted successfulky" });
  } catch (error) {}
});

app.get("/cars/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select()
      .eq("id", req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
