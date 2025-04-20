// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Solo los datos necesarios del usuario
interface UserState {
  user: {
    uid: string;
    email: string | null;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string | null }>
    ) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
