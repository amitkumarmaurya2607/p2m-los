"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

store.subscribe(() => {
  const state = store.getState();

  try {
    const appData = {
      mobile: state.application.mobile,
      pan: state.application.pan,
      personalInfo: state.application.personalInfo,
      aadhaar: state.application.aadhaar,
      bankDetails: state.application.bankDetails,
      selfie: state.application.selfie,
      employmentDetails: state.application.employmentDetails,
    };
    sessionStorage.setItem("p2m-loan-application", JSON.stringify(appData));
  } catch {
    /* ignore */
  }

  try {
    const authData = {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    };
    sessionStorage.setItem("p2m-auth", JSON.stringify(authData));
  } catch {
    /* ignore */
  }
});

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
