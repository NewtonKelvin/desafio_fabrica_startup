// const express = import("express");
import express from "express";
import cors from "cors";
import routes from "./routes";

import bodyParser from "body-parser";
import { connectDB } from "./database";

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", routes);

//Port
const PORT = process.env.PORT || 3001;
const IPV4 = process.env.IPV4 || "192.168.15.81";
app.listen(PORT, () => {
  console.log(`Server: running on http://${IPV4}:${PORT}/`);
  connectDB();
});
