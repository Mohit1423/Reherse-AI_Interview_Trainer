import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addInterview: (state, action) => {
      state.user.interviews.push(action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, addInterview, logoutUser } = userSlice.actions;
export default userSlice.reducer;
