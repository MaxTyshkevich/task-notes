import React from 'react';
import { useAppSelector } from '../store/hooks';
import { NoteCard } from './NoteCard';
import { Box } from '@mui/material';

export const ListNote = () => {
  const { list, selectedTags } = useAppSelector((state) => state.notes);
  return (
    <div>
      <Box
        component={'ul'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: 0,
          overflowY: 'scroll',
        }}
        gap={3}
      >
        {selectedTags.length
          ? list
              .filter((card) =>
                card.flags.find((t) => selectedTags.includes(t))
              )
              .map((card) => <NoteCard card={card} key={card.id} />)
          : list.map((card) => <NoteCard card={card} key={card.id} />)}
      </Box>
    </div>
  );
};
