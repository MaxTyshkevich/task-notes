import { Box, Button, Card, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Note } from '../store/notes';

export const NoteCard = ({ card }: { card: Note }) => {
  const [value, setValue] = useState(card.text);
  const [isChange, setIsChange] = useState(false);

  const handleUpdate = () => {
    setIsChange(!isChange);
  };
  const handleDelete = () => {};

  return (
    <Card
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {isChange ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={handleUpdate} variant="contained" color="success">
            Update
          </Button>
          <Input value={value} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
          <Typography>{value}</Typography>
          <Button onClick={handleDelete} variant="contained" color="error">
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
