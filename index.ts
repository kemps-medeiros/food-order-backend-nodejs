import express from "express";
import { AdminRoute, VendorRoute } from "./routes";

const app = express();

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

app.listen(5000, () => {
  console.log("server is running");
});
