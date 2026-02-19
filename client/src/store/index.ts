import { configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import FormBuilderReducer from "./slices/formBuilderSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formBuilder: FormBuilderReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
