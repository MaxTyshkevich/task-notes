import React from 'react';
import { useAppSelector } from '../store/hooks';
import { NoteCard } from './NoteCard';
import { Box } from '@mui/material';

export const ListNote = () => {
  const { list } = useAppSelector((state) => state.notes);
  return (
    <div>
      <Box
        component={'ul'}
        sx={{ display: 'flex', flexDirection: 'column' }}
        gap={3}
      >
        {list.map((card, index) => (
          <NoteCard card={card} key={index} />
        ))}
      </Box>
    </div>
  );
};
