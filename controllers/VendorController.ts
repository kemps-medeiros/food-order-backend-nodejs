import { NextFunction, Request, Response } from "express";
import { IEditVendorInputs, IVendorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <IVendorLoginInputs>req.body;

  const vendorFound = await FindVendor("", email);

  if (vendorFound !== null) {
    //validation login

    const validation = await ValidatePassword(password, vendorFound.password, vendorFound.salt);

    if (validation) {
      const signature = GenerateSignature({
        _id: vendorFound._id,
        email: vendorFound.email,
        foodtypes: vendorFound.foodType,
        name: vendorFound.name,
      });

      return res.json(signature);
    } else {
      return res.json({ message: "Email or password not valid" });
    }
  }

  return res.json({ message: "Login credential not valid" });
};

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
    const vendorFound = await FindVendor(user._id);

    return res.json({ vendorFound });
  }

  return res.json({ message: "Vendor Information Not Found" });
};

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, phone, foodTypes } = <IEditVendorInputs>req.body;

  const user = req.user;

  if (user) {
    const vendorFound = await FindVendor(user._id);

    if (vendorFound !== null) {
      vendorFound.name = name;
      vendorFound.address = address;
      vendorFound.phone = phone;
      vendorFound.foodType = foodTypes;

      const savedResult = await vendorFound.save();
      return res.json(savedResult);
    }

    return res.json({ vendorFound });
  }

  return res.json({ message: "Vendor Information Not Found" });
};

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
    const vendorFound = await FindVendor(user._id);

    if (vendorFound !== null) {
      vendorFound.serviceAvailable = !vendorFound.serviceAvailable;

      const savedResult = await vendorFound.save();
      return res.json(savedResult);
    }

    return res.json({ vendorFound });
  }

  return res.json({ message: "Vendor Information Not Found" });
};
