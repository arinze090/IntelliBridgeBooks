import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  books: [],
  lastAPIFetchTime: null,
  bookLocations: {}, // { [bookId]: { progress, location } }
  bookmarkedBooks: [],
  bookCategories: [],
  selectedBook: null,
  booksOnlyData: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    getBooks: (state, action) => {
      state.books = action.payload;
    },

    saveLoginTime: (state, action) => {
      state.lastLoginTime = action.payload;
    },
    setLoading: (state, action) => {
      state.loading =
        action.payload?.loading !== undefined
          ? action.payload?.loading
          : state.loading;
    },
    APILastFetchTime: (state, action) => {
      state.lastAPIFetchTime = action.payload;
    },
    setBookLocation: (state, action) => {
      const { bookId, progress, location, bookInfo } = action.payload;
      state.bookLocations[bookId] = { progress, location, bookInfo };
    },
    setClearAllBookLocations: (state, action) => {
      state.bookLocations = {};
    },
    saveBookmarkedBooks: (state, action) => {
      state.bookmarkedBooks = [...state.bookmarkedBooks, action.payload];
    },
    removeBookFromBookmarks: (state, action) => {
      const updatedSavedItems = state.bookmarkedBooks.filter(
        (item) => item.id !== action.payload.id,
      );

      state.bookmarkedBooks = updatedSavedItems;
    },
    saveBookCategories: (state, action) => {
      state.bookCategories = action.payload;
    },
    saveSelectedbook: (state, action) => {
      state.selectedBook = action.payload;
    },

    removeBooksAfterSignOut: (state, action) => {
      state.books = [];
      state.bookCategories = [];
    },
    saveBookOnlyData: (state, action) => {
      state.booksOnlyData = action.payload;
    },
  },
});

export const {
  getBooks,
  APILastFetchTime,
  saveLoginTime,
  setBookLocation,
  setClearAllBookLocations,
  saveBookmarkedBooks,
  removeBookFromBookmarks,
  saveBookCategories,
  saveSelectedbook,
  removeBooksAfterSignOut,
  saveBookOnlyData,
} = booksSlice.actions;
export default booksSlice.reducer;
