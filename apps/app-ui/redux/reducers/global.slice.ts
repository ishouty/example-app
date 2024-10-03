// features/userSlice.js
import { containsComponentDeclaration } from '@nx/react/src/generators/stories/stories';
import { createSlice } from '@reduxjs/toolkit';

// Initial state for user slice
const initialState = {
  authenticated: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateAuthenicated: (state, action) => {
      // console.log(action, 'update Authenicated !!!');
      return (state.authenticated = action.payload.authenticated);
    },
  },
});

// Export the action created by createSlice
export const { updateAuthenicated } = globalSlice.actions;

// Export the reducer to be used in store configuration
export default globalSlice.reducer;
