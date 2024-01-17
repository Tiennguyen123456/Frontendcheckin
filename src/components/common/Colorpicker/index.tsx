import { ThemeProvider, createTheme } from "@mui/material";
import { MuiColorInput, MuiColorInputColors, MuiColorInputFormat, MuiColorInputValue } from "mui-color-input";
import React from "react";
import { themeColors } from "../../../theme/theme";

type Props = {
  format?: MuiColorInputFormat;
  value: MuiColorInputValue;
  onChange?: (value: string, colors: MuiColorInputColors) => void;
};

const CustomColorPicker = ({ format, value, onChange }: Props) => {
  return (
    <ThemeProvider theme={colorPickerTheme}>
      <MuiColorInput format={format} value={value} onChange={onChange} />
    </ThemeProvider>
  );
};

export default CustomColorPicker;

//Styled
const colorPickerTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.colors.blackRgba60,
    },
  },
  typography: {
    allVariants: {
      color: themeColors.colors.blackRgba87,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: 15,
          color: themeColors.colors.blackRgba87,
          "&::placeholder": {
            color: themeColors.colors.blackRgba38,
          },
        },
      },
    },
  },
});
