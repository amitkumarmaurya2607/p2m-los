import type { ApiResponse } from "@/types";

export type MockKey = `${"GET" | "POST" | "PUT" | "DELETE"} ${string}`;

const mockStore: Map<MockKey, () => unknown> = new Map();

export function registerMock(method: MockKey, handler: () => unknown): void {
  mockStore.set(method, handler);
}

export function getMock(method: string, url: string): unknown | null {
  const key = `${method.toUpperCase()} ${url}` as MockKey;
  const handler = mockStore.get(key);
  return handler ? handler() : null;
}

registerMock("POST /auth/send-otp", (): ApiResponse<{ verified: boolean }> => ({
  success: true,
  data: { verified: false },
  message: "OTP sent successfully",
}));

registerMock("POST /auth/verify-otp", (): ApiResponse<{ verified: boolean }> => ({
  success: true,
  data: { verified: true },
  message: "OTP verified successfully",
}));

registerMock("POST /pan/verify", (): ApiResponse<{ number: string; fullName: string; verified: boolean }> => ({
  success: true,
  data: { number: "ABCDE1234F", fullName: "John Doe", verified: true },
  message: "PAN verified successfully",
}));

registerMock("POST /aadhaar/send-otp", (): ApiResponse<{ verified: boolean }> => ({
  success: true,
  data: { verified: false },
  message: "Aadhaar OTP sent",
}));

registerMock("POST /aadhaar/verify-otp", (): ApiResponse<{ verified: boolean; number: string }> => ({
  success: true,
  data: { verified: true, number: "123412341234" },
  message: "Aadhaar verified successfully",
}));

registerMock(
  "POST /bank/verify",
  (): ApiResponse<{ accountNumber: string; ifsc: string; accountType: string; verified: boolean }> => ({
    success: true,
    data: { accountNumber: "1234567890", ifsc: "SBIN0001234", accountType: "savings", verified: true },
    message: "Bank verified successfully",
  }),
);

registerMock(
  "POST /employment/submit",
  (): ApiResponse<{ verified: boolean }> => ({
    success: true,
    data: { verified: true },
    message: "Employment details submitted",
  }),
);

registerMock(
  "POST /application/submit",
  (): ApiResponse<{ applicationId: string; submitted: boolean }> => ({
    success: true,
    data: { applicationId: "LOS-2026-0001", submitted: true },
    message: "Application submitted successfully",
  }),
);

registerMock(
  "GET /application/status",
  (): ApiResponse<{ id: string; status: string; stage: string; updatedAt: string }> => ({
    success: true,
    data: { id: "LOS-2026-0001", status: "in-review", stage: "Document Verification", updatedAt: new Date().toISOString() },
  }),
);

registerMock(
  "GET /lookup/schemes",
  (): ApiResponse<Array<{ id: string; name: string; minAmount: number; maxAmount: number; interestRate: number; maxTenure: number }>> => ({
    success: true,
    data: [
      { id: "personal-loan", name: "Personal Loan", minAmount: 10000, maxAmount: 2500000, interestRate: 10.5, maxTenure: 60 },
      { id: "business-loan", name: "Business Loan", minAmount: 50000, maxAmount: 5000000, interestRate: 12.0, maxTenure: 84 },
      { id: "home-loan", name: "Home Loan", minAmount: 200000, maxAmount: 10000000, interestRate: 8.5, maxTenure: 360 },
    ],
  }),
);

registerMock(
  "POST /contact/submit",
  (): ApiResponse<{ submitted: boolean }> => ({
    success: true,
    data: { submitted: true },
    message: "Message sent successfully",
  }),
);
