import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ListNote } from './components/ListNote';
import AddNode from './components/AddNode';
import { Filter } from './components/Filter';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxHeight: '100vh',
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                My Notes!
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AddNode />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Filter />
              </Grid>
              <Grid item xs={12} sm={8}>
                <ListNote />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </PersistGate>
    </Provider>
  );
}

export default App;
