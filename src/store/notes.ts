import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state
export interface Notes {
  value: string;
  list: Note[];
}

export interface Note {
  id: string;
  text: string;
  flags: string[];
}
// Define the initial state using that type
const initialState: Notes = {
  value: '',
  list: [
    {
      id: '28572dda-0241-f87a-87f9-559257992401',
      text: 'my first note',
      flags: ['#sdfs'],
    },

    {
      id: 'ab551ff3-701c-db0b-5bfb-2eee60ad61ca',
      text: 'my first note 2',
      flags: ['#aal'],
    },
  ],
};

export const noteSlice = createSlice({
  name: 'notes',

  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateNote: () => {},
    createNode: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { increment, incrementByAmount, createNode } = noteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.notes.value;

export default noteSlice.reducer;
