import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Person from "../models/Person";
import LocalStorageKey from "../utils/local-storage/LocalStorageKey";

interface PersonState {
  data: Person[];
}

const initialState = (): PersonState => {
  try {
    const serializedState = localStorage.getItem(LocalStorageKey.persons);
    if (serializedState === null) {
      return {
        data: [],
      };
    }

    return {
      data: JSON.parse(serializedState),
    };

  } catch (err) {
    return {
      data: [],
    };
  }
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.data.push(action.payload);
    },
    deletePerson: (state, action: PayloadAction<number[]>) => {
      if (action.payload.length === 1) {
        state.data.splice(action.payload[0], 1);
      } else {
        state.data = state.data.filter(
          (row, index) => !action.payload.includes(index)
        );
      }
    },
  },
});

export const { addPerson, deletePerson } = personSlice.actions;
export default personSlice.reducer;
