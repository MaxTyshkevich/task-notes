import '@material-ui/core/styles';
declare module '@mui/material/styles' {
  export interface Palette {
    edit: Palette['primary'];
  }

  export interface PaletteOptions {
    edit?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    edit: true;
  }
}

declare module '@mui/material/IconButton' {
  export interface IconButtonPropsColorOverrides {
    edit: true;
  }
}
