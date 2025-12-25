import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initProcess(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    SignUpSuccess(state, action: PayloadAction<any | null>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    signInSuccess(state, action: PayloadAction<any | null>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    FailedAction(state, action: PayloadAction<any | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearMessage(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const { initProcess, SignUpSuccess, signInSuccess, FailedAction, clearMessage } = userSlice.actions;
export default userSlice.reducer;
