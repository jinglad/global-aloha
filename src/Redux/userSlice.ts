import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type PropsType = {
  globalAccessToken: string,
  user: any,
  profile: any,
}

const initialState = {
  globalAccessToken: "",
  user: null,
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.globalAccessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      console.log("profile", state.profile);
      state.profile = action.payload;
    }
  }
})

export const { setAccessToken, setUser, setProfile } = userSlice.actions; 

export default userSlice.reducer;