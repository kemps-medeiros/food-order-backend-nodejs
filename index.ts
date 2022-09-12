import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";

const StartServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  app.listen(5000, () => {
    console.log("server is running");
  });
};

StartServer();
