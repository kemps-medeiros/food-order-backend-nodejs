export interface ICreateVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface IVendorLoginInputs {
  email: string;
  password: string;
}
