import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type PropsTypes = {
  libraryList: any;
  count: Number;
}

const initialState: PropsTypes = {
  libraryList: [],
  count: 0,
}

const librarySlice = createSlice({
  name: 'activity-library',
  initialState,
  reducers: {
    setLibraryList: (state, action) => {
      state.libraryList = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    }
  }
})

export const { setLibraryList, setCount } = librarySlice.actions;

export default librarySlice.reducer;