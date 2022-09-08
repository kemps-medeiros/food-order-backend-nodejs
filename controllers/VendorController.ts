import { NextFunction, Request, Response } from "express";
import { IVendorLoginInputs } from "../dto";
import { ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <IVendorLoginInputs>req.body;

  const vendorFound = await FindVendor("", email);

  if (vendorFound !== null) {
    //validation login

    const validation = await ValidatePassword(password, vendorFound.password, vendorFound.salt);

    if (validation) {
      return res.json(vendorFound);
    } else {
      return res.json({ message: "Email or password not valid" });
    }
  }

  return res.json({ message: "Login credential not valid" });
};
