import express, { NextFunction, Request, Response } from "express";
import {
  CustomerLogin,
  CustomerSignup,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOtp,
} from "../controllers";

const router = express.Router();

/**------------SignUp / Create Customer ------*/

router.post("/signup", CustomerSignup);

/**------------Login-------------- */

router.post("/login", CustomerLogin);

/**------------Verify Customer Account ---------- */

router.patch("/verify", CustomerVerify);

/**------------OTP / Requesting OTP------------------ */

router.get("/otp", RequestOtp);

/**------------Profile------------------ */

router.get("/profile", GetCustomerProfile);

router.patch("/profile", EditCustomerProfile);
//Cart
//Order
//Payment

export { router as CustomerRoute };
