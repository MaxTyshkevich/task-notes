import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  PaletteMode,
  Theme,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { blue, yellow, grey, common } from '@mui/material/colors';

export const customTheme = (mode: PaletteMode): Theme =>
  responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: 'Roboto',
      },

      spacing: 8,

      palette: {
        mode,
        primary: {
          main: blue[500],
          contrastText: grey[900],
        },
        background: {
          default: common.white,
          paper: grey[50],
        },
        edit: {
          main: yellow[300],
        },
        action: {
          disabledBackground: '', // don't set the disable background color
          disabled: '', // set the disable foreground color
        },

        contrastThreshold: 4.5,
      },

      components: {},
    })
  );
