
export type loginPayload = {
    mobileNumber: string;
    orgId: string;
}
export type loginVerifyPayload = {
    mobileNumber: string;
    userId: string;
    otp: string;
    orgId?: string;
}