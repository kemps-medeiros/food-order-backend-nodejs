import express, { Request, Response, NextFunction } from "express";
import { GetFoodAvailability, GetFoodsIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from "../controllers";

const router = express.Router();

/** --------------Food Avaiability--------------------- */
router.get("/:pincode", GetFoodAvailability);

/** --------------Top Restaurants--------------------- */
router.get("/top-restaurantes/:pincode", GetTopRestaurants);

/** --------------Food Available in 30min--------------------- */
router.get("/foods-in-30-min/:pincode", GetFoodsIn30Min);

/** --------------Search Foods--------------------- */
router.get("/search/:pincode", SearchFoods);

/** --------------Find Restaurant By ID--------------------- */
router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
