import express, { NextFunction, Request, Response } from "express";
import { VendorLogin } from "../controllers";

const router = express.Router();

router.post("/login", VendorLogin);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Vandor" });
});

export { router as VendorRoute };
