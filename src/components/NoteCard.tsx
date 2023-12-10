import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Input,
  Tooltip,
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
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        gap: 1,
      }}
      id={card.id}
    >
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <Tooltip title="Update">
          <IconButton
            size="small"
            color={isChange ? 'success' : 'default'}
            aria-label="update"
            onClick={() => handleUpdate(card.id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => handleDelete(card.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <CardContent
        sx={{
          display: 'flex',
          gap: 2,

          flexDirection: 'column',
        }}
      >
        {isChange ? (
          <Input
            fullWidth
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {value}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ display: 'flex', padding: 2 }} gap={2}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, textTransform: 'uppercase' }}
        >
          tags:{' '}
        </Typography>
        {card.flags.map((flag, i) => (
          <Typography variant="caption" key={i}>
            {flag}
          </Typography>
        ))}
      </Box>
    </Card>
  );
};
