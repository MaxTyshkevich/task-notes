import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setfilterTags } from '../store/notes';

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
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="sort">Tags</InputLabel>
        <Select
          labelId="dsort"
          multiple
          value={selectedTag}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          /* MenuProps={MenuProps} */
        >
          {tagsList.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

/* 

    <div>
      <Select
        defaultValue={['dog']}
        multiple
           onChange={handleChange} 
        sx={{
          minWidth: '13rem',
        }}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        {tagsList.map((tag) => (
          <Option key={tag} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
    </div>

*/
