import { Box, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import React, { FormEvent, useState } from 'react';
import uuid from 'react-uuid';
import { Note, createNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';

const findtags = (str: string) => {
  const reg = /#\w+/gi;
  const tags = str.match(reg);

  return tags ? tags : [];
};

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

    console.log({ node });
    dispath(createNote(node));
  };
  return (
    <Box
      component={'form'}
      sx={{ display: 'flex', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <Button
        variant="contained"
        color="success"
        type="submit"
        disabled={!value}
      >
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
