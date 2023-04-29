import { PaletteColorOptions } from "@mui/material/styles/createPalette";
import createTheme from "@mui/material/styles/createTheme";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const buttonThemes = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    darkTurquoise: createColor("#1a3c40"),
  },
});

declare module "@mui/material/styles" {
  interface CustomPalette {
    darkTurquoise: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    darkTurquoise: true;
  }
}

export default buttonThemes;
