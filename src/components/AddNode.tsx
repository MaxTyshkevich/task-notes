import { Box, Button, styled } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import React, { FormEvent, useState } from 'react';
import uuid from 'react-uuid';
import { Note, createNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';
import { findtags } from '../utils/findTags';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const TextArea = styled(TextareaAutosize, {
  name: 'Mui-Textarea',
  label: 'Mui-Textarea',
})(({ theme }) => {
  console.log({ theme });
  console.log(theme.palette.text.primary);
  return {
    flexGrow: 1,
    border: `solid ${theme.palette.text.secondary} 1px`,
    color: theme.palette.text.secondary,

    fontFamily: 'Roboto',
    resize: 'none',
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2, 1.8),
    fontSize: '1em',
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
    '&:focus-visible': {
      borderColor: theme.palette.primary.light,
    },

    '&:focus': {
      borderColor: theme.palette.primary.light,
    },
  };
});

const AddNode = () => {
  const [value, setValue] = useState('');
  const dispath = useAppDispatch();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note: Note = {
      id: uuid(),
      text: value,
      flags: findtags(value),
    };

    dispath(createNote(note));

    setValue('');
  };
  return (
    <Box paddingY={2}>
      <Box
        component={'form'}
        sx={{ display: 'flex', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Button
          sx={{
            alignSelf: 'flex-start',
            '&.Mui-disabled': {
              opacity: 0.7,
            },
          }}
          variant="contained"
          color="success"
          type="submit"
          disabled={!value}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
        <TextArea
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
