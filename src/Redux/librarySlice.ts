import { createSlice } from '@reduxjs/toolkit';

type PropsTypes = {
  libraryList: any;
  groups: any;
  count: Number;
  groupCount: Number;
}

const initialState: PropsTypes = {
  libraryList: [],
  groups: [],
  count: 0,
  groupCount: 0,
}

const librarySlice = createSlice({
  name: 'activity-library',
  initialState,
  reducers: {
    setLibraryList: (state, action) => {
      state.libraryList = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    }, 
    setGroupCount: (state, action) => {
      state.count = action.payload;
    }
  }
})

export const { setLibraryList, setCount, setGroups, setGroupCount } = librarySlice.actions;

export default librarySlice.reducer;