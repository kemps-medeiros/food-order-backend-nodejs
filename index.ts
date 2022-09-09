import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI, {
    autoIndex: true,
  })
  .then((result) => {
    console.log("Conected to database");
    //verificar como incluir as seguintes opções nesse novo jeito de conectar com mongoose:
    // useNewUrlParser: true
    // useUnifieldTopoloy: true
    // useCreateIndex:: true
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("server is running");
});
