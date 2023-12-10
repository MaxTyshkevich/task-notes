import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setfilterTags } from '../store/notes';
import { Typography } from '@mui/joy';
import { Box } from '@mui/material';

export const Filter = () => {
  const { tagsList } = useAppSelector((state) => state.notes);
  const [selectedTag, setSelectedTag] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setfilterTags(selectedTag));
  }, [dispatch, selectedTag]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTag>) => {
    const {
      target: { value },
    } = event;

    console.log('target.value', value);
    setSelectedTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Typography component="h3">Filter Note for tags</Typography>
      <FormControl
        sx={{
          m: 1,
          display: 'flex',
          width: '-webkit-fill-available',
        }}
      >
        <InputLabel id="sort">Selected Tags</InputLabel>
        <Select
          labelId="dsort"
          multiple
          value={selectedTag}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          sx={(theme) => ({
            borderRadius: theme.spacing(1.5),
          })}
          fullWidth
        >
          {tagsList.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

/* 
const TextArea = styled(TextareaAutosize)(({ theme }) => {
  console.log(`${theme.spacing(1)} ${theme.spacing(2)}`);
  return {
    flexGrow: 1,
    resize: 'none',
    borderRadius: theme.spacing(1.5),
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    fontSize: '1em',
  };
});

*/
