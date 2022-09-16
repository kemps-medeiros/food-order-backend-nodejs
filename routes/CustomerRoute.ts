import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

/**------------SignUp / Create Customer ------*/
router.post("/signup");

/**------------Login-------------- */
router.post("/login");
/**------------Verify Customer Account ---------- */
router.patch("/verify");
/**------------OTP / Requesting OTP------------------ */
router.get("/otp");
/**------------Profile------------------ */

router.get("/profile");
router.patch("/profile");
//Cart
//Order
//Payment

export { router as CustomerRoute };
