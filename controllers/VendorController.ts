import { NextFunction, Request, Response } from "express";
import { IEditVendorInputs, IVendorLoginInputs } from "../dto";
import { ICreateFoodInputs } from "../dto/Foods.dto";
import { Food } from "../models/Food";
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

export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
    const vendor = await FindVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      vendor.coverImages.push(...images);

      const result = await vendor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "Error on add food" });
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

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
    const { name, description, category, foodType, readyTime, price } = <ICreateFoodInputs>req.body;

    const vendor = await FindVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      const createdFood = await Food.create({
        vendorId: vendor._id,
        name,
        description,
        category,
        foodType,
        images: images,
        readyTime,
        price,
        rating: 0,
      });

      vendor.foods.push(createdFood);

      const result = await vendor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "Error on add food" });
};

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
    const foods = await Food.find({ vendorId: user._id });

    if (foods !== null) {
      return res.json(foods);
    }
  }

  return res.json({ message: "Foods information not found" });
};
