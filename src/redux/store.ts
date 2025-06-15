import { configureStore } from "@reduxjs/toolkit";
import { allApi } from "./features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [allApi.reducerPath] : allApi.reducer

  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(allApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
