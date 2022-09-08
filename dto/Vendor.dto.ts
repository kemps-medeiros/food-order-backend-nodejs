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

export interface IEditVendorInputs {
  name: string;
  address: string;
  phone: string;
  foodTypes: [string];
}

export interface IVendorLoginInputs {
  email: string;
  password: string;
}

export interface IVendorPayload {
  _id: string;
  email: string;
  name: string;
  foodtypes: [string];
}
