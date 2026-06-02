import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
import { StepProgressData } from "./auth.service";


export type PanVerificationData = {

    success: boolean;
    dob: string;
    name: string;
    address: string;
    fathersName: string | null;
    message: string;
    provider: string;
    raw: {
      result: {
        dob: string;
        pan: string;
        email: string;
        gender: "male" | "female" | "other";
        mobile: string;
        address: {
          city: string;
          state: string;
          country: string;
          pincode: string;
          locality: string;
          street_name: string;
          building_name: string;
        };
        fullname: string;
        pan_type: string;
        last_name: string;
        first_name: string;
        middle_name: string;
        aadhaar_linked: boolean;
        aadhaar_number: string;
      };
      request_id: string;
      result_code: number;
      client_ref_num: string;
      http_response_code: number;
    };

};

export async function sendEmailOTP(email: string): Promise<ApiResponse<{ otp: string }>> {
  return apiPost<ApiResponse<{ otp: string }>>(API.email.sendOTP, { email });
}

export async function submitPersonalInfo(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.personalInfo.submit, data);
}


export type PanVerificationResponse = ApiResponse<PanVerificationData>;

export async function getPersonalInfo(): Promise<PanVerificationResponse> {
  return apiGet<PanVerificationResponse>(API.personalInfo.getDetails);
}
