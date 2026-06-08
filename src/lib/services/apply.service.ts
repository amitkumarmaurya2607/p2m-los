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



export type LoansCredibilityDataResponce = {
  id: string | null;
  ruleType: string | null;
  minAmount: number | null;
  maxAmount: number | null;
  tenures: number[];
  isAllowed: boolean;
  workflowUrl: string | null;
  loan: LoanData | null;
};

export type LoanData = {
  id: string;
  userId: string;
  ruleType: string;
  status: string;
  amount: number;
  closingType: string;
  closureDate: string | null;
  disbursementDate: string | null;
  isMigratedloan: boolean;

  agreement: LoanAgreements;

  repayment: LoanRepayments;

  disbursement: LoanDisbursements;

  loanDetails: LoanDetails_;
};

export type LoanAgreements = {
  id: string;
  status: string;
};

export type LoanRepayments = {
  feeBreakdowns: LoanFeeBreakdowns[];
};

export type LoanDisbursements = {
  deductions: LoanDeductions[];
};

export type LoanFeeBreakdowns = {
  id: string;
  type: string;
  calculationValueType: string;
  calculationBaseAmount: number;
  calculationTaxAmount: number;
  chargeMode: string;
  total: number;
  repaymentId: string;
  chargeValue: number;
  isRecurringDaily: boolean;
};

export type LoanDeductions = {
  id: string;
  type: string;
  calculationValueType: string;
  calculationBaseAmount: number;
  calculationTaxAmount: number;
  chargeMode: string;
  total: number;
  disbursementId: string;
  chargeValue: number;
  isRecurringDaily: boolean;
};

export type LoanDetails_ = {
  dueDate: string;
};



export type LoanDetailsResponse = {
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
  status: string;
  xlsxCount: number;
  formattedLoanId: string;
  noDuesCertificate: string | null;
  loanType: string;
  closingType: string;
  isActive: boolean;
  ruleType: string;
  isMigratedloan: boolean;
  oldLoanId: string | null;

  forceBsaReportByPass: boolean;
  forceCreditReportByPass: boolean;

  loan_applied_amount: number;
  loan_cx_approved_amount: number;
  loan_sm_sh_approved_amount: number;

  skip_auto_pay_consent: boolean;
  is_repeat_loan: boolean;
  is_skip_evaluation_approval: boolean;
  is_cam_calculation_required: boolean;
  is_email_reminder: boolean;

  loan_collection_assigned_partner_user_id: string | null;
  loan_cx_approved_by_partner_user_id: string | null;
  loan_cx_assigned_partner_user_id: string | null;
  loan_due_date: string;
  loan_repayment_type_id: number;
  loan_sm_sh_approved_by_partner_user_id: string | null;
  loan_status_id: string | null;
  loan_tenure_days: number;
  is_workflow_automated: boolean | null;
  lendbox_loan_id: string | null;
  loan_cm_ch_assigned_partner_user_id: string | null;
  loan_collection_assigned_at: string | null;
  loan_cx_allocated_at: string | null;
  loan_sm_sh_allocated_at: string | null;
  loan_sm_sh_assigned_partner_user_id: string | null;

  repayment: LoanRepayment;
  costSummary: LoanCostSummary;
  earlyRepayment: LoanEarlyRepayment;
  evaluations: LoanEvaluation[];
  penalties: LoanPenalty[];
  loanStatusHistory: LoanStatusHistory[];
  agreement: LoanAgreement;
  paymentRequests: PaymentRequest[];
  disbursement: LoanDisbursement;
  loanDetails: LoanDetails;
  user: LoanUser;
  allocatedPartners: AllocatedPartner[];
};

export type LoanRepayment = {
  id: string;
  totalObligation: number;
  totalFees: number;
  loanId: string;
  feeBreakdowns: LoanFeeBreakdown[];
};

export type LoanFeeBreakdown = {
  id: string;
  type: string;
  calculationValueType: string;
  calculationBaseAmount: number;
  calculationTaxAmount: number;
  chargeMode: string;
  total: number;
  repaymentId: string;
  chargeValue: number;
  isRecurringDaily: boolean;
  taxes: LoanTax[];
};

export type LoanCostSummary = {
  id: string;
  totalTaxes: number;
  effectiveAPR: number;
  loanId: string;
};

export type LoanEarlyRepayment = {
  id: string;
  totalAmount: number;
  loanId: string;
};

export type LoanEvaluation = {
  id: string;
  userId: string;
  createdAt: string;
  loanId: string;
  autoGeneratedFeedback: string | null;
  isBsaReportAvailable: boolean;
  isCreditReportAvailable: boolean;
  isAaAvailable: boolean;
  is_cam_available: boolean;
  evaluation_item: EvaluationItem[];
};

export type EvaluationItem = {
  id: string;
  evaluationId: string;
  parameter: string;
  requiredValue: string;
  actualValue: string;
  source: string;
  status: string;
  override: boolean;
  comments: string;
  availableSources: string[];
  brandEvaluationItemId: string;
  stage: string;

  bsa_branding_discrepancies: string | null;
  bsa_fraud_check_source: string | null;
  bsa_incomplete_information: string | null;
  bsa_inconsistent_presentation: string | null;
  bsa_mismatched_total: string | null;
  bsa_missing_contact_info: string | null;
  bsa_outdated_designs: string | null;
  bsa_spelling_grammar_mistakes: string | null;
  bsa_strange_statement_period: string | null;
  bsa_unfamiliar_transactions: string | null;
  bsa_unusual_figures: string | null;
};

export type LoanPenalty = {
  id: string;
  chargeValue: number;
  taxChargeValue: number;
  isTaxInclusive: boolean;
  loanId: string;
  taxValueType: string;
  valueType: string;
  type: string;
  taxType: string;
};

export type LoanStatusHistory = {
  id: string;
  loanId: string;
  status: string;
  message: string;
  createdAt: string;
  partnerUserId: string | null;
  partnerUser: StatusPartnerUser | null;
  loan_status_brand_reasons: LoanStatusBrandReason[];
};

export type StatusPartnerUser = {
  name: string;
  isActive: boolean;
  email: string;
  reportsTo: string | null;
};

export type LoanStatusBrandReason = Record<string, unknown>;

export type LoanAgreement = {
  id: string;
  loanId: string;
  status: string;
  signedByUser: boolean;
  createdAt: string;
  updatedAt: string;
  signedFilePrivateKey: string | null;
  signed: string | null;
  unsignedData: string | null;
  signedAt: string | null;
  aadhaarSuffix: string | null;
};



export type LoanDisbursement = {
  id: string;
  grossAmount: number;
  totalDeductions: number;
  netAmount: number;
  loanId: string;
  processing_fee: number;
  deductions: LoanDeduction[];
};

export type LoanDeduction = {
  id: string;
  type: string;
  calculationValueType: string;
  calculationBaseAmount: number;
  calculationTaxAmount: number;
  chargeMode: string;
  total: number;
  disbursementId: string;
  chargeValue: number;
  isRecurringDaily: boolean;
  taxes: LoanTax[];
};

export type LoanTax = {
  id: string;
  type: string;
  chargeValue: number;
  amount: number;
  isInclusive: boolean;
  deductionId?: string;
  valueType: string;
};

export type LoanDetails = {
  id: string;
  principal: number;
  type: string;
  durationDays: number;
  dueDate: string;
  loanId: string;
  allowPrepayment: boolean;
  grossPeriod: number;
  minActiveTermDays: number;
  minPostActiveTermDays: number;
  postActiveDate: string;
  maxActiveTermDays: number;
  minActiveRepaymentDays: number;
};

export type LoanUser = {
  id: string;
  email: string;
  phoneNumber: string;
  alternatePhoneNumbers: AlternatePhoneNumber[];
};

export type AlternatePhoneNumber = {
  id: string;
  name: string;
  relationship: string | null;
  phone: string;
};

export type AllocatedPartner = {
  id: string;
  loanId: string;
  partnerUserId: string;
  allottedAt: string;
  amount: number;
  partnerUser: AllocatedPartnerUser;
};

export type AllocatedPartnerUser = {
  id: string;
  email: string;
  name: string;
  reportsToId: string | null;
};

export type LoansListResponse = LoanListItem[];

export type LoanListItem = {
  id: string;
  formattedLoanId: string;
  amount: number;
  userId: string;
  brandId: string;
  status: string;
  is_skip_evaluation_approval: boolean;
  createdAt: string;
  forceBsaReportByPass: boolean;
  forceCreditReportByPass: boolean;

  user: LoanUsers;

  applicationDate: string;

  loanDetails: LoanListDetails;

  disbursement: LoanListDisbursement;

  repayment: LoanListRepayment;

  paymentRequests: PaymentRequest[];
};

export type LoanUsers = {
  id: string;
  email: string;
  phoneNumber: string;
  alternatePhoneNumbers: AlternatePhoneNumbers[];
};

export type AlternatePhoneNumbers = {
  id: string;
  name: string;
  relationship: string | null;
  phone: string;
};

export type LoanListDetails = {
  dueDate: string;
  durationDays: number;
};

export type LoanListDisbursement = {
  netAmount: number;
  grossAmount: number;
  totalDeductions: number;
  deductions: LoanListDeduction[];
};

export type LoanListDeduction = {
  type: string;
  total: number;
  chargeValue: number;
  chargeMode: string;
};

export type LoanListRepayment = {
  totalObligation: number;
  totalFees: number;
  feeBreakdowns: LoanListFeeBreakdown[];
};

export type LoanListFeeBreakdown = {
  type: string;
  calculationValueType: string;
  calculationBaseAmount: number;
  calculationTaxAmount: number;
  chargeMode: string;
  total: number;
  chargeValue: number;
  isRecurringDaily: boolean;
};

export type PaymentRequest = Record<string, unknown>;


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

