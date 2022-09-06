import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Vandor" });
});

export { router as VendorRoute };