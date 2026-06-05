import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

export type LoanEligibilityRuleResponce = {
  id: string;
  ruleType: "poor" | "average" | "good" | "excellent" | string;

  minAmount: number;
  maxAmount: number;

  suggestedAmount: number | null;
  suggestedDueDate: string | null;

  coupons: unknown[];

  processingFee: number | null;
  interest: number | null;

  tenures: LoanTenure;

  isAllowed: boolean;

  loan: unknown | null;
  workflowUrl: string | null;

  maxCompleteLoanCount: number;
  reloanAutomationResult: unknown | null;
};

export type LoanTenure = {
  id: string;
  minTermDays: number;
  maxTermDays: number;
};

type LoanDetailsType = {
  id: string;
  userId: string;
  brandId: string;

  amount: number;
  purpose: string | null;

  applicationDate: string;
  approvalDate: string | null;
  disbursementDate: string | null;
  closureDate: string | null;

  createdAt: string;
  updatedAt: string;

  status: "PENDING" | "APPROVED" | "REJECTED" | "DISBURSED" | "CLOSED" | string;

  xlsxCount: number;
  formattedLoanId: string;
  noDuesCertificate: string | null;

  loanType: string;
  closingType: "NORMAL" | "FORECLOSED" | "SETTLED" | string;

  isActive: boolean;
  ruleType: "poor" | "average" | "good" | "excellent" | string;

  isMigratedloan: boolean;
  oldLoanId: string | null;

  forceBsaReportByPass: boolean;
  forceCreditReportByPass: boolean;

  loan_applied_amount: number;
  loan_cx_approved_amount: number | null;
  loan_sm_sh_approved_amount: number | null;

  skip_auto_pay_consent: boolean;
  is_repeat_loan: boolean;
  is_skip_evaluation_approval: boolean;
  is_cam_calculation_required: boolean;
  is_email_reminder: boolean;

  loan_collection_assigned_partner_user_id: string | null;
  loan_cx_approved_by_partner_user_id: string | null;
  loan_cx_assigned_partner_user_id: string | null;

  loan_due_date: string | null;
  loan_repayment_type_id: number | null;
  loan_sm_sh_approved_by_partner_user_id: string | null;
  loan_status_id: number | null;
  loan_tenure_days: number | null;

  is_workflow_automated: boolean | null;

  lendbox_loan_id: string | null;

  loan_cm_ch_assigned_partner_user_id: string | null;

  loan_collection_assigned_at: string | null;
  loan_cx_allocated_at: string | null;
  loan_sm_sh_allocated_at: string | null;

  loan_sm_sh_assigned_partner_user_id: string | null;
};

export async function getLoanPrograms(): Promise<ApiResponse<LoanEligibilityRuleResponce>> {
  return apiGet<ApiResponse<LoanEligibilityRuleResponce>>(API.loan.program);
}

export type LoansCredibilityData = Record<string, unknown>;

export async function getLoansCredibility(): Promise<ApiResponse<LoansCredibilityData>> {
  return apiGet<ApiResponse<LoansCredibilityData>>(API.loan.credibility);
}

export async function submitApplication(
  data: unknown,
): Promise<ApiResponse<LoanDetailsType>> {
  return apiPost<ApiResponse<LoanDetailsType>>(
    API.application.submit,
    data,
  );
}

