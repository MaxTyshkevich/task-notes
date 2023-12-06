import { Box, Button, Card, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Note, deleteNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';

export const NoteCard = ({ card }: { card: Note }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(card.text);
  const [isChange, setIsChange] = useState(false);
  const handleUpdate = (id: string) => {
    setIsChange(!isChange);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <Card
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      id={card.id}
    >
      {isChange ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => handleUpdate(card.id)}
            variant="contained"
            color="success"
          >
            Update
          </Button>
          <Input value={value} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button onClick={() => handleUpdate(card.id)} variant="contained">
            Update
          </Button>
          <Typography>{value}</Typography>
          <Button
            onClick={() => handleDelete(card.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      )}
      <Box sx={{ display: 'flex' }} gap={2}>
        <Typography>tags: </Typography>
        {card.flags.map((flag, i) => (
          <Box key={i}>{flag}</Box>
        ))}
      </Box>
    </Card>
  );
};
