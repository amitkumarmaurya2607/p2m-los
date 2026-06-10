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

export type LoanDetailsType = {
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

export interface SendOTPResponse {
  code: string;
  message?: string;
  data?: {
    mobileNumber: string;
    id: string;
  };
  msg?: string;
  errorCodeList?: unknown[];
}

export interface VerifyOTPResponse {
  accessToken: string;
  user: {
    brandId: string;
    email: string | null;
    emailVerified: boolean;
    employmentId: string;
    googleId: string | null;
    id: string;
    onboardingStep: number;
    phoneNumber: string;
    phoneVerified: boolean;
    userDetailsId: string;
    whatsappVerified: boolean;
  };
}

export type OnboardingProgress = {
  userId: string;
  steps: OnboardingStep[];
  completed: number;
  failed: number;
  pending: number;
  nextStep: OnboardingStepKey | string | null;
};

export type OnboardingStep = {
  step: OnboardingStepKey | string;
  status: OnboardingStepStatus;
  completedAt: string | null;
};

export type OnboardingStepStatus = "COMPLETED" | "PENDING" | "FAILED" | string;

export type OnboardingStepKey =
  | "MOBILE_NUM_VERIFY"
  | "PAN_VERIFY"
  | "PERSONAL_DETAIL"
  | "AADHAAR_VERIFY"
  | "BANK_VERIFY"
  | "BANK_STATEMENT_OR_CONSENT"
  | "DEVICE_SAVE"
  | "SAVE_EMP_INFO"
  | "MEDIA_UPLOAD"
  | "GEO_LOCATION"
  | "ALTERNATE_MOB_NUM"
  | "LOCAL_ADD_PROOF"
  | "LOAN_APPLY";

export type StepProgressResponse = ApiResponse<OnboardingProgress>;

export type VerifyPANResponse = {
  success: boolean;
  dob: string;
  name: string;
  address: string;
  fathersName: string | null;
  message: string;
  provider: "DIGITAP" | string;
  raw: Record<string, unknown>;
};

export type BankDetailsReaponce = {
  id: string;
  userId: string;

  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: "SAVINGS" | "CURRENT" | string;

  isVerified: boolean;
  verificationMethod: string | null;
  verificationStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;
  verifiedAt: string | null;

  createdAt: string;
  updatedAt: string;

  userDataStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;
  isPrimary: boolean;

  pennyDropResponse: unknown | null;
  pennyDropStatus: string | null;
  pennyVerifiedName: string | null;

  beneficiary_name: string | null;
  name_match_percentage: number | null;
  verification_provider: string | null;
};

export type KycUnifiedUrlResponse = {
  success: boolean;
  message: string;
  url: string;
  id: string;
  uniqueId: string;
  provider: "DIGITAP" | string;
  raw: {
    code: string;
    model: modelType;
  };
};

export type modelType = {
  url: string;
  transactionId: string;
  kycUrl: string;
};

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

export type PanVerificationResponse = ApiResponse<PanVerificationData>;

export type BankStatementResponce = {
  id: string;
  userId: string;
  userBankAccountId: string;

  filePrivateKey: string;
  filePassword: string | null;

  fromDate: string | null;
  toDate: string | null;

  message: string | null;

  isFraud: boolean;
  fraudScore: number;

  createdAt: string;
  updatedAt: string;
};

export type FetchStatementResponse = {
  requestId: string;
  tempUrl: string;
};

export type ValueType = "percentage" | "fixed";
export type ChargeMode = "EXCLUSIVE" | "INCLUSIVE";
export type PenaltyType = "SIMPLE" | string;
export type TaxType = "GST" | string;

export type FeeTax = {
  taxType?: TaxType;
  taxValueType?: ValueType;
  taxRate?: string;
  taxAmount?: string;
  isTaxInclusive?: boolean;
};

export type FeeCalculation = {
  principalAmount: string;
  rateApplied: string;
  daysApplied: number;
  formula: string;
};

export type FeeBreakdown = {
  type: string;
  chargeMode: ChargeMode;
  valueType: ValueType;
  chargeValue: string;
  isRecurringDaily: boolean;
  calculatedFeeAmount: string;
  totalTaxes: string;
  totalAmount: string;
  taxes: FeeTax[];
  calculation: FeeCalculation;
};

export type PenaltyCalculation = {
  baseAmount: string;
  overdueDays: number;
  penaltyInterest: string;
  method: string;
  formula: string;
  calculation: string;
  stepByStep: string[];
};

export type TaxCalculation = {
  method: string;
  formula: string;
  calculation: string;
  stepByStep: string[];
};

export type PenaltyTax = {
  taxType: TaxType;
  taxValueType: ValueType;
  taxRate: string;
  taxAmount: string;
  isTaxInclusive: boolean;
  taxCalculation: TaxCalculation;
};

export type PenaltySummary = {
  penaltyAmount: string;
  taxAmount: string;
  totalPenaltyAmount: string;
  description: string;
};

export type PenaltyBreakdownInfo = {
  isOverdue: boolean;
  daysOverdue: number;
  dailyPenaltyRate: string;
  penaltyMethod: string;
  taxMethod: string;
};

export type PenaltyBreakdown = {
  penaltyId: string;
  penaltyType: PenaltyType;
  penaltyValueType: ValueType;
  penaltyRate: string;
  penaltyCalculation: PenaltyCalculation;
  tax: PenaltyTax;
  summary: PenaltySummary;
  breakdown: PenaltyBreakdownInfo;
};

export type RepaymentTotals = {
  principalAmount: string;
  totalFees: string;
  totalTaxes: string;
  totalPenalties: string;
};

export type RepaymentDetailsType = {
  loanId: string;
  userId: string;
  principalAmount: string;
  applicationDate: string;
  dueDate: string;
  repaymentDate: string;
  totalDays: number;
  daysBeforeDue: number;
  daysAfterDue: number;
  isOverdue: boolean;
  feeBreakdowns: FeeBreakdown[];
  penaltyBreakdown: PenaltyBreakdown[];
  totals: RepaymentTotals;
  totalRepayment: string;
};

export type initpaymentType = {
  upiUrl: string;
  qrcode: string;
  transactionId: string;
};

export type EmploymentDetailsType = {
  id: string;
  userId: string;

  companyName: string;
  designation: string;
  joiningDate: string;

  salary: number;
  companyAddress: string;
  pinCode: string;

  uanNumber: string | null;
  modeOfSalary: "BANK_TRANSFER" | "CASH" | "CHEQUE" | string;

  userDataStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;

  expectedDateOfSalary: number;
  salaryExceedsBase: boolean;

  officialEmail: string;
  employmenttype: "FULL_TIME" | "PART_TIME" | "SELF_EMPLOYED" | "CONTRACT" | string;

  payslips: PayslipType[];

  createdAt: string;
  updatedAt: string;
};

export type PayslipType = {
  id?: string;
  fileName?: string;
  fileUrl?: string;
  fileKey?: string;
  month?: string;
  year?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AadhaarProviderData = {
  verification?: AadhaarVerification;
  documentLinks?: AadhaarDocumentLinks;
  addressDetails?: AadhaarAddressDetails;
  personalDetails?: AadhaarPersonalDetails;

  rawCallbackData?: {
    verification?: AadhaarVerification;
    documentLinks?: AadhaarDocumentLinks;
    addressDetails?: AadhaarAddressDetails;
    personalDetails?: AadhaarPersonalDetails;

    rawCallbackData?: {
      status?: string;
      message?: string;
      provider?: string;
      timestamp?: string;
      responseCode?: string;
      transactionId?: string;
    };
  };
};

export type AadhaarVerification = {
  source?: string;
  passCode?: string;
  uniqueId?: string;
  isXmlValid?: boolean;
  referenceId?: string;
};

export type AadhaarDocumentLinks = {
  xmlLink?: string;
  imageBase64?: string;
  downloadLink?: string;
};

export type AadhaarAddressDetails = {
  house?: string;
  state?: string;
  street?: string;
  country?: string;
  pincode?: string;
  vtcName?: string;
  district?: string;
  landmark?: string;
  locality?: string;
  subDistrict?: string;
  postOfficeName?: string;
};

export type AadhaarPersonalDetails = {
  dob?: string;
  name?: string;
  careOf?: string;
  gender?: string;
  aadhaarNumber?: string;
};

export type KycDocumentType = {
  id: string;
  userId: string;

  frontDocumentUrl: string | null;
  backDocumentUrl: string | null;
  verificationNotes: string | null;
  documentNumber: string | null;

  userDataStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;

  verifiedAt: string | null;
  isApprovedByAdmin: boolean;

  providerData: {
    result?: {
      dob?: string;
      pan?: string;
      email?: string;
      gender?: string;
      mobile?: string;
      address?: {
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
        locality?: string;
        street_name?: string;
        building_name?: string;
      };
      fullname?: string;
      pan_type?: string;
      last_name?: string;
      first_name?: string;
      middle_name?: string;
      aadhaar_linked?: boolean;
      aadhaar_number?: string;
    };

    request_id?: string;
    result_code?: number;
    client_ref_num?: string;
    http_response_code?: number;

    verification?: {
      source?: string;
      passCode?: string;
      uniqueId?: string;
      isXmlValid?: boolean;
      referenceId?: string;
    };

    documentLinks?: {
      xmlLink?: string;
      imageBase64?: string;
      downloadLink?: string;
    };

    addressDetails?: {
      house?: string;
      state?: string;
      street?: string;
      country?: string;
      pincode?: string;
      vtcName?: string;
      district?: string;
      landmark?: string;
      locality?: string;
      subDistrict?: string;
      postOfficeName?: string;
    };

    personalDetails?: {
      dob?: string;
      name?: string;
      careOf?: string;
      gender?: string;
      aadhaarNumber?: string;
    };

    rawCallbackData?: {
      verification?: {
        source?: string;
        passCode?: string;
        uniqueId?: string;
        isXmlValid?: boolean;
        referenceId?: string;
      };

      documentLinks?: {
        xmlLink?: string;
        imageBase64?: string;
        downloadLink?: string;
      };

      addressDetails?: {
        house?: string;
        state?: string;
        street?: string;
        country?: string;
        pincode?: string;
        vtcName?: string;
        district?: string;
        landmark?: string;
        locality?: string;
        subDistrict?: string;
        postOfficeName?: string;
      };

      personalDetails?: {
        dob?: string;
        name?: string;
        careOf?: string;
        gender?: string;
        aadhaarNumber?: string;
      };

      rawCallbackData?: {
        status?: string;
        message?: string;
        provider?: string;
        timestamp?: string;
        responseCode?: string;
        transactionId?: string;
      };
    };
  };

  backPassword: string | null;
  frontPassword: string | null;

  type: "PAN" | "AADHAAR" | string;
  status: "APPROVED" | "REJECTED" | "PENDING" | "FAILED" | string;

  createdAt: string;
  updatedAt: string;
};
