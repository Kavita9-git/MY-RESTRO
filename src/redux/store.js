import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import bannerReducer from "./slices/bannerSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    banner: bannerReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

export default store;
