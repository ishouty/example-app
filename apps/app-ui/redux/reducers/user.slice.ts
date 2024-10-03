// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { VerifyTokenDto } from '@shared/common';

// Initial state for user slice
const initialState: VerifyTokenDto = {
  name: '',
  age: 0,
  createdAt: '',
  email: '',
  iat: 0,
  exp: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
  },
});

// Export the action created by createSlice
export const { updateUser } = userSlice.actions;

// Export the reducer to be used in store configuration
export default userSlice.reducer;
