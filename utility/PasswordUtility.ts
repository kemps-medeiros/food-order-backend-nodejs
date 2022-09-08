import bcrypt from "bcrypt";
import { APP_SECRET } from "../config";
import { IVendorPayload } from "../dto";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePasswordEncrypted = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  return (await GeneratePasswordEncrypted(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = (payload: IVendorPayload) => {
  const signature = jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });

  return signature;
};

export const ValidateSignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = (await jwt.verify(signature.split(" ")[1], APP_SECRET)) as AuthPayload;

    req.user = payload;

    return true;
  }

  return false;
};
