import { Box, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import React, { FormEvent, useState } from 'react';
import uuid from 'react-uuid';
import { Note, createNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';
import { findtags } from '../utils/findTags';
import AddIcon from '@mui/icons-material/Add';

const AddNode = () => {
  const [value, setValue] = useState('');
  const dispath = useAppDispatch();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const node: Note = {
      id: uuid(),
      text: value,
      flags: findtags(value),
    };

    dispath(createNote(node));
  };
  return (
    <Box paddingY={2}>
      <Box
        component={'form'}
        sx={{ display: 'flex', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Button
          sx={{ alignSelf: 'flex-start' }}
          variant="contained"
          color="success"
          type="submit"
          disabled={!value}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
        <Textarea
          sx={{ flexGrow: 1 }}
          placeholder="Type in here…"
          minRows={2}
          maxRows={2}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </Box>
    </Box>
  );
};

export default AddNode;
