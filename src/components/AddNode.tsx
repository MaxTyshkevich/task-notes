import { Box, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import React, { FormEvent, useState } from 'react';
import uuid from 'react-uuid';
import { Note, createNode } from '../store/notes';
import { useAppDispatch } from '../store/hooks';

const AddNode = () => {
  const [value, setValue] = useState('');
  const dispath = useAppDispatch();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = uuid();

    const node: Note = {
      id,
      text: value,
      flags: [],
    };

    console.log({ node });
    dispath(createNode(node));
  };
  return (
    <Box
      component={'form'}
      sx={{ display: 'flex', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <Button variant="contained" color="success" type="submit">
        Create
      </Button>
      <Textarea
        placeholder="Type in here…"
        minRows={2}
        maxRows={2}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </Box>
  );
};

export default AddNode;
