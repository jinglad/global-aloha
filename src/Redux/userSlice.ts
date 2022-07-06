import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  globalAccessToken: "",
  user: "",
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.globalAccessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;