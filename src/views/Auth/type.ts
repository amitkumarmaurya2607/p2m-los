export type loginPayload = {
  mobileNumber: string;
  brandId: string;
};
export type loginVerifyPayload = {
  userId: string;
  otp: string;
  type: string;
  deviceId?: string;
  brandId?: string;
};
