import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // also fix typo here

const appStore = configureStore({
  reducer: {
    user: userReducer,
  }
});

export default appStore; // ✅ default export
