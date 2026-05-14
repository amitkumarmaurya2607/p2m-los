import type { ApplicationState } from "@/context/ApplicationContext";

export const MOCK_APPLICATION_DATA = {
  mobile: { number: "9876543210", verified: true },
  pan: { number: "ABCDE1234F" },
  personalInfo: {
    fullName: "Rahul Sharma",
    fatherName: "Suresh Sharma",
    email: "rahul.sharma@example.com",
    dob: "1992-08-15T00:00:00.000Z",
    gender: "Male",
    salary: "85000",
    employmentType: "Salaried",
    address1: "42, Indiranagar Double Road",
    address2: "Near Food Street",
    pincode: "560038",
    city: "Bangalore",
    state: "Karnataka",
  },
  aadhaar: { number: "987698769876", verified: true },
  bankDetails: { accountNumber: "12345678901", ifsc: "SBIN0001234", accountType: "savings" },
  selfie: { captured: true },
  employmentDetails: {
    companyName: "Tech Corp India Pvt Ltd",
    designation: "Senior Software Engineer",
    email: "rahul.sharma@techcorp.com",
    salary: "85000",
    salaryMode: "Bank Transfer",
    joiningDate: "2019-06-01T00:00:00.000Z",
    uan: "123456789012",
    city: "Bangalore",
    pincode: "560103",
  },
  loanCalculator: {
    viewed: true,
    loanAmount: 500000,
    tenure: 36,
    interestRate: 10.5,
    emi: 16270,
    totalPayable: 585720,
  },
  review: { submitted: false },
} satisfies ApplicationState;

export function fillMockApplication(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("p2m-loan-application", JSON.stringify(MOCK_APPLICATION_DATA));
}
