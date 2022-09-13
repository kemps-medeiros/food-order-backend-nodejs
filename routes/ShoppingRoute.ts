import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

/** --------------Food Avaiability--------------------- */
router.get("/:pincode");

/** --------------Top Restaurants--------------------- */
router.get("/top-restaurantes/:pincode");

/** --------------Food Available in 30min--------------------- */
router.get("/foods-in-30-min/:pincode");

/** --------------Search Foods--------------------- */
router.get("/search/:pincode");

/** --------------Find Restaurant By ID--------------------- */
router.get("/restaurants/:id");

export { router as ShoppingRoute };
