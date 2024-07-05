import { configureStore } from "@reduxjs/toolkit";
import bridgeReducer from "./slices/bridge";

const store = configureStore({
  reducer: {
    bridge: bridgeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
