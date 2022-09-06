import { NextFunction, Request, Response } from "express";
import { ICreateVendorInput } from "../dto";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, email, foodType, ownerName, phone, pincode, password } = <ICreateVendorInput>req.body;

  return res.json({ name, address, email, foodType, ownerName, phone, pincode, password });
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {};
