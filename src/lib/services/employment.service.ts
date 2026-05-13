import { apiPost } from "@/lib/axios";
import type { ApiResponse } from "@/types";

interface EmploymentData {
  companyName: string;
  designation: string;
  email: string;
  salary: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  city: string;
  pincode: string;
}

interface EmploymentResponse {
  verified: boolean;
}

export async function submitEmployment(data: EmploymentData): Promise<ApiResponse<EmploymentResponse>> {
  return apiPost<ApiResponse<EmploymentResponse>>("/employment/submit", data);
}
