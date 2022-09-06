import express, { NextFunction, Request, Response } from "express";
import { CreateVendor } from "../controllers";

const router = express.Router();

router.post("/vendor", CreateVendor);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin" });
});

export { router as AdminRoute };
