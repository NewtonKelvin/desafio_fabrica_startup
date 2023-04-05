// const express = import("express");
import express from "express";
import cors from "cors";
import routes from "./routes";

import bodyParser from "body-parser";

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", routes);

//Database

//Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server: running on http://192.168.15.81:${PORT}/v1/`);
});
