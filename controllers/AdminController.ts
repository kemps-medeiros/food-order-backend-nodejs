import { NextFunction, Request, Response } from "express";
import { ICreateVendorInput } from "../dto";
import { Vendor } from "../models/Vendor";
import { GeneratePasswordEncrypted, GenerateSalt } from "../utility";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, email, foodType, ownerName, phone, pincode, password } = <ICreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor !== null) {
    return res.json({ message: "Vendor ALready Exists with this email" });
  }

  //generate a salt
  const salt = await GenerateSalt();
  const passwordEncypted = await GeneratePasswordEncrypted(password, salt);

  //encrypt the password using the salt

  const createdVendor = await Vendor.create({
    name,
    address,
    email,
    foodType,
    ownerName,
    phone,
    pincode,
    password: passwordEncypted,
    salt: salt,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
  });

  return res.json(createdVendor);
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {};
