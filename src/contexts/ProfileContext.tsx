"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import { LoansCredibilityDataResponce } from "@/lib/actions/action.type";
import { getProfileDataAction } from "@/lib/actions/other.action";
import { showToast } from "@/lib/toast";
import { UserDetailsType } from "@/types";
import { getLoansCredibilityAction } from "@/lib/actions/apply.action";

type LoanStatus = "loading" | "approved" | "processing" | "rejected" | "due" | "active" | "error";

type LoanApplicationData = {
  applicationId: string;
  status: "APPROVED" | "PROCESSING" | "REJECTED" | "DUE" | string;
  loanAmount: number;
  dueDate: string;
  agreement: string;
  msg: string;
};

type ProfileContextType = {
  loading: boolean;
  profileData: UserDetailsType | null;
  loansCredibility: LoansCredibilityDataResponce | null;
  setLoansCredibility: Dispatch<SetStateAction<LoansCredibilityDataResponce | null>>;
  getDetails: () => Promise<void>;
  status: LoanStatus;
  loanData: LoanApplicationData | null;
  errorMsg: string;
  currentStatus: string;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserDetailsType | null>(null);
  const [loansCredibility, setLoansCredibility] = useState<LoansCredibilityDataResponce | null>(
    null,
  );

  const [status, setStatus] = useState<LoanStatus>("loading");
  const [loanData, setLoanData] = useState<LoanApplicationData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getProfileDataAction();

      if (result?.success && result?.data) {
        const data = result.data;

        const name = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");

        localStorage.setItem(
          "Profile",
          JSON.stringify({
            name: name || "User",
            img: data?.profilePicUrl || "",
          }),
        );

        setProfileData(data as UserDetailsType);
        return;
      }

      showToast({
        message: result?.error || "Something went wrong",
        type: "error",
      });
    } catch (err) {
      console.log("err", err);

      showToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasRun = useRef(false);

  async function fetchLoanStatus() {
    try {
      setStatus("loading");

      const res = await getLoansCredibilityAction();

      if (!res?.success || !res?.data) {
        throw new Error(res?.error ?? "Unable to fetch loan application status");
      }

      const { data } = res;

      if (!data.loan) {
        setStatus("error");
        setLoanData({
          applicationId: "",
          status: "",
          loanAmount: 0,
          dueDate: "",
          agreement: "",
          msg: data.loan ? "Success" : "No active loan application found",
        });
        // throw new Error("No active loan application found");
        return;
      }

      setLoansCredibility(data);

      setLoanData({
        applicationId: data?.loan?.id,
        status: data?.loan?.status,
        loanAmount: data?.loan?.amount,
        dueDate: data?.loan?.loanDetails?.dueDate,
        agreement: data?.loan?.agreement?.status,
        msg: data.loan ? "Success" : "No active loan application found",
      });
      setCurrentStatus(data?.loan?.status);
      const apiStatus = data?.loan?.status?.toUpperCase();
      if (apiStatus === "ACTIVE") {
        setStatus("active");
      } else if (apiStatus === "APPROVED") setStatus("approved");
      else if (apiStatus === "REJECTED") setStatus("rejected");
      else setStatus("processing");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";

      setErrorMsg(message);
      setStatus("error");

      showToast({
        message,
        type: "error",
      });
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    // if (hasRun.current) return;
    // hasRun.current = true;

    fetchLoanStatus();
    getDetails();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        loading,
        profileData,
        loansCredibility,
        setLoansCredibility,
        getDetails,
        status,
        loanData,
        errorMsg,
        currentStatus,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
};
