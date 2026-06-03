import { ApiResponse, UserDetailsType } from "@/types";
import { API } from "../api/urls";
import { apiGet } from "../axios";


export async function getProfileData(): Promise<ApiResponse<UserDetailsType>> {
  return apiGet<Promise<ApiResponse<UserDetailsType>>>(API.others.userProfile);
}
