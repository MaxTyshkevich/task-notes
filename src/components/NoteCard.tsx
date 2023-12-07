import {
  Box,
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { Note, deleteNote, updateNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';
import { findtags } from '../utils/findTags';
import uuid from 'react-uuid';

export const NoteCard = ({ card }: { card: Note }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(card.text);
  const [isChange, setIsChange] = useState(false);

  const handleUpdate = (id: string) => {
    if (isChange) {
      const changedNode: Note = {
        id: uuid(),
        text: value,
        flags: findtags(value),
      };

      dispatch(updateNote({ id, changedNode }));
    }
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
          <IconButton
            aria-label="update"
            onClick={() => handleUpdate(card.id)}
            color="success"
          >
            <EditIcon />
          </IconButton>
          <Input
            fullWidth
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="update" onClick={() => handleUpdate(card.id)}>
            <EditIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>{value}</Typography>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(card.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
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
