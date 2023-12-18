import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Input,
  Tooltip,
  Typography,
  TypographyOwnProps,
  TypographyProps,
  styled,
  useTheme,
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
  /*   const theme = useTheme();
  console.log({ ...theme.palette }); */
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
        padding: (theme) => theme.spacing(0.5, 2, 1),
        '& .MuiCardActions-root': {},
      }}
      id={card.id}
    >
      <CardActions sx={{ alignSelf: 'flex-end', p: 0 }}>
        <Tooltip title="Update">
          <IconButton
            size="small"
            color={isChange ? 'success' : 'edit'}
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
      <Divider />

      <Box sx={{ display: 'flex' }} gap={2}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, textTransform: 'uppercase' }}
        >
          tags:{' '}
        </Typography>
        {card.flags.map((flag, i) => (
          <Tag customProp={'adasd'} key={i} variant="caption">
            {flag.slice(1)}
          </Tag>
        ))}
      </Box>
    </Card>
  );
};

interface TagProps {
  customProp: string;
}

const Tag = styled(Typography, {
  name: 'MyTagComponent',
  slot: 'Root',
  shouldForwardProp: (prop) => {
    console.log(prop);
    if (prop === 'customProp') return false;

    return true;
  },
})<TagProps>(({ theme }, ...props) => {
  console.log(props, theme);
  return {
    textTransform: 'capitalize',
  };
});

/* const Tag = ({
  children,
  customProp,
}: {
  children: React.ReactNode;
  customProp: boolean;
}) => (
  <Typography >
    {children} {customProp}
  </Typography>
);
 */
