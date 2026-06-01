export type loginPayload = {
  mobileNumber: string;
  brandId: string;
};
export type loginVerifyPayload = {
  mobileNumber: string;
  id: string;
  otp: string;
  brandId?: string;
};
