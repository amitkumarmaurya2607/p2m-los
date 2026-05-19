import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface EmploymentData {
  companyName: string;
  designation: string;
  email: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  state: string;
  city: string;
  pincode: string;
}

interface EmploymentResponse {
  verified: boolean;
}

export async function submitEmployment(
  data: EmploymentData,
): Promise<ApiResponse<EmploymentResponse>> {
  return apiPost<ApiResponse<EmploymentResponse>>(API.employment.submit, data);
}
