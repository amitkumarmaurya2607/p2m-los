import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice";
import applicationReducer from "@/features/application/applicationSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    application: applicationReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
