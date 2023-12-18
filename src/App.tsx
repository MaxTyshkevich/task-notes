import React, { useRef } from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  PaletteMode,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ListNote } from './components/ListNote';
import AddNode from './components/AddNode';
import { Filter } from './components/Filter';
import { AppWrapper } from './components/AppWrapper';
import { customTheme } from './theme/theme';

function App() {
  const prefersDarkMode: PaletteMode = useMediaQuery(
    '(prefers-color-scheme: dark)'
  )
    ? 'dark'
    : 'light';

  const theme = React.useMemo(
    () => customTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',

            '& .MuiContainer-root': {},
            '& .MuiGrid-container': {
              height: 1,
            },
            '& .list-grid': {
              position: 'relative',
              flexGrow: 1,
            },
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="h1">
                My Notes!
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="md">
            <AddNode />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Filter />
              </Grid>
              <Grid item xs={12} sm={8} className="list-grid">
                <ListNote />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
