import express, { NextFunction, Request, Response } from "express";
import { CreateVendor, GetVendorById, GetVendors } from "../controllers";

const router = express.Router();

router.post("/vendor", CreateVendor);

router.post("/vendors", GetVendors);

router.post("/vendor/:id", GetVendorById);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin" });
});

export { router as AdminRoute };
