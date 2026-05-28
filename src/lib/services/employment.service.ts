import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface EmploymentData {
  companyName: string;
  designation: string;
  officialEmail: string;
  joiningDate: string;
  salary: number;
  companyAddress: string;
  pinCode: string;
  uanNumber: string;
  expectedDateOfSalary: number;
  modeOfSalary: string;
}

interface EmploymentResponse {
  submitted: boolean;
}

export async function submitEmployment(
  data: EmploymentData,
): Promise<ApiResponse<EmploymentResponse>> {
  return apiPost<ApiResponse<EmploymentResponse>>(API.employment.submit, data);
}
