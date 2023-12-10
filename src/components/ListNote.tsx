import React from 'react';
import { useAppSelector } from '../store/hooks';
import { NoteCard } from './NoteCard';
import { Box } from '@mui/material';

export const ListNote = () => {
  const { list, selectedTags } = useAppSelector((state) => state.notes);
  return (
    <Box
      sx={{
        display: 'block',
        padding: 2,
        overflowY: 'hidden',
      }}
    >
      <Box
        component={'ul'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
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
    </Box>
  );
};
