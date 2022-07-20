import { createSlice } from '@reduxjs/toolkit';

type PropsTypes = {
  libraryList: any;
  groups: any;
  count: Number;
  groupCount: Number;
  myLibrary: any;
  myGroup: any;
  searchKey: string;
}

const initialState: PropsTypes = {
  libraryList: [],
  groups: [],
  count: 0,
  groupCount: 0,
  myLibrary: [],
  myGroup: [],
  searchKey: "",
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
    }, 
    setMyLibrary: (state, action) => {
      state.myLibrary = action.payload;
    },
    setMyGroup: (state, action) => {
      state.myGroup = action.payload;
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    }
  }
})

export const { setLibraryList, setCount, setGroups, setGroupCount, setMyLibrary, setMyGroup, setSearchKey } = librarySlice.actions;

export default librarySlice.reducer;