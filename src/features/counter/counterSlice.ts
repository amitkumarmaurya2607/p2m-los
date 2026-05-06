import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  lastUpdated: number | null;
}

const initialState: CounterState = {
  value: 0,
  lastUpdated: null,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.lastUpdated = Date.now();
    },
    decrement: (state) => {
      state.value -= 1;
      state.lastUpdated = Date.now();
    },
    reset: (state) => {
      state.value = 0;
      state.lastUpdated = Date.now();
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      state.lastUpdated = Date.now();
    },
  },
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;
export default counterSlice.reducer;
