import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state
export interface Notes {
  list: Note[];
  tagsList: string[];
  selectedTags: string[];
}

export interface Note {
  id: string;
  text: string;
  flags: string[];
}
// Define the initial state using that type
const initialState: Notes = {
  tagsList: [],
  selectedTags: [],
  list: [],
};

const updateTagsList = (list: Note[]): string[] => {
  let tags: string[] = [];

  list.forEach(({ flags }: Note) => {
    tags = tags.concat(flags);
  });

  return [...new Set(tags).values()];
};

export const noteSlice = createSlice({
  name: 'notes',

  initialState,
  reducers: {
    updateNote: () => {},
    createNote: (
      state,
      action: {
        payload: Note;
        type: string;
      }
    ) => {
      state.list = [action.payload, ...state.list];

      /*    const updateTagslist = state.list.reduce((acc, { flags }: Note) => {
        return [...acc, ...flags];
      }, [] as string[]); */

      state.tagsList = updateTagsList(state.list);
    },
    deleteNote: (
      state,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      state.list = state.list.filter(({ id }) => id !== action.payload);

      /*  const updateTagslist = state.list.reduce((acc, { flags }: Note) => {
        return [...acc, ...flags];
      }, [] as string[]); */

      state.tagsList = updateTagsList(state.list);
    },
    setfilterTags(
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) {
      state.selectedTags = action.payload;
    },
  },
});

export const { createNote, deleteNote, setfilterTags } = noteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const storeNotes = (state: RootState) => state.notes;

export default noteSlice.reducer;
