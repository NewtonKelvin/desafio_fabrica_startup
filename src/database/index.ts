import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// Replace the uri string with your connection string.
const user = process.env.CLUSTER_USER;
const pass = process.env.CLUSTER_PASS;
const cluster_url = process.env.CLUSTER_URL;

const uri = `mongodb+srv://${user}:${pass}@${cluster_url}/desafio_fabrica_startup?retryWrites=true&w=majority`;

export async function connectDB() {
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Database: successfully connected!");
    })
    .catch((err) => {
      console.log("Database: connection error - ", err);
    });
}
