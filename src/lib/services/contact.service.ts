import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  submitted: boolean;
}

export async function submitContact(data: ContactData): Promise<ApiResponse<ContactResponse>> {
  return apiPost<ApiResponse<ContactResponse>>(API.contact.submit, data);
}
