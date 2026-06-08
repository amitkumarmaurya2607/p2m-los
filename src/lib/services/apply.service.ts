import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
import type {
  LoanEligibilityRuleResponce,
  LoansCredibilityDataResponce,
  LoanDetailsType,
  LoanDetailsResponse,
  LoansListResponse,
  RepaymentDetailsType,
 
} from "@/lib/actions/action.type";



export async function getLoanPrograms(): Promise<ApiResponse<LoanEligibilityRuleResponce>> {
  return apiGet<ApiResponse<LoanEligibilityRuleResponce>>(API.loan.program);
}




export async function getLoansCredibility(): Promise<ApiResponse<LoansCredibilityDataResponce>> {
  return apiGet<ApiResponse<LoansCredibilityDataResponce>>(API.loan.credibility);
}



export async function getLoanList(): Promise<ApiResponse<LoansListResponse[]>> {
  return apiGet<ApiResponse<LoansListResponse[]>>(API.loan.getLoan);
}


export async function getLoanDetails(
  loanId: string,
): Promise<ApiResponse<LoanDetailsResponse>> {
  return apiPost<ApiResponse<LoanDetailsResponse>>(API.loan.getLoanDetails, {
    loanId,
  });
}

export async function submitApplication(
  data: unknown,
): Promise<ApiResponse<LoanDetailsType>> {
  return apiPost<ApiResponse<LoanDetailsType>>(
    API.application.submit,
    data,
  );
}


export async function getCurrentRepayment(
  loanId: string,
): Promise<ApiResponse<RepaymentDetailsType>> {
  return apiPost<ApiResponse<RepaymentDetailsType>>(API.loan.currentRepayment, {
    loanId,
  });
}
