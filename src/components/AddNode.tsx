import { Box, Button, styled, TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import React, { FormEvent, useState } from 'react';
import uuid from 'react-uuid';
import { Note, createNote } from '../store/notes';
import { useAppDispatch } from '../store/hooks';
import { findtags } from '../utils/findTags';
import AddIcon from '@mui/icons-material/Add';

const TextArea = styled(TextareaAutosize, {
  name: 'Mui-Textarea',
  slot: 'Root',
})(({ theme }) => {
  console.log({ theme });
  console.log(theme.palette.primary.light);
  return {
    flexGrow: 1,
    border: `solid ${theme.palette.text.disabled} 1px`,
    color: theme.palette.text.secondary,

    fontFamily: 'Roboto',
    resize: 'none',
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2, 1.8),
    fontSize: '1em',
    transition: theme.transitions.create('all'),
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },

    '&:focus-visible, &:focus, &:visited,&:focus-wihin': {
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
        {/*   <TextArea
          sx={(theme) => ({
            '&:focus-visible': {
              borderColor: theme.palette.primary.light,
            },

            '&:focus': {
              borderColor: theme.palette.primary.light,
            },
          })}
          placeholder="Type in here…"
          minRows={2}
          maxRows={2}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        /> */}
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={2}
          placeholder="Type in here…"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: (theme) => theme.spacing(1.5),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AddNode;
