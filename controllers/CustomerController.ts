import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateCustomerInputs } from "../dto/Customer.dto";
import { Customer } from "../models/Customer";
import { GenerateOtp, GeneratePasswordEncrypted, GenerateSalt } from "../utility";

export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {
  const customerInputs = plainToClass(CreateCustomerInputs, req.body);

  const inputErrors = await validate(customerInputs, { validationError: { target: true } });

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }

  const { email, phone, password } = customerInputs;

  const salt = await GenerateSalt();
  const userPassword = await GeneratePasswordEncrypted(password, salt);

  const { otp, expiry } = GenerateOtp();
  const otp_expiry = new Date();

  console.log(otp, expiry);

  return res.json("working...");

  const result = await Customer.create({
    email: email,
    password: password,
    salt: salt,
    phone: phone,
    otp: otp,
    otp_expiry: expiry,
    firstName: "",
    lastName: "",
    address: "",
    verified: false,
    lat: 0,
    lng: 0,
  });

  if (result) {
    //send OTP to customer
    //generate the signature
    //send the result to client
  }
};

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {};

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {};

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {};

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {};

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {};
