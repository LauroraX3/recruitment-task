import { configureStore } from "@reduxjs/toolkit";
import PersonReducer from "../reducers/PersonReducer";
import LocalStorageKey from "../utils/local-storage/LocalStorageKey";

export const store = configureStore({
  reducer: {
    person: PersonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  const state = store.getState();
  const persons = state.person.data;
  localStorage.setItem(LocalStorageKey.persons, JSON.stringify(persons))
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
