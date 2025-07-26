import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export const setupStore = (preloadedState?: Partial<Omit<RootState, "">>) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
