import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import clsx from "clsx";
import { useState } from "react";
import { DateFormat } from "../../../constants/variables";
import { StyledLabel } from "../../../styles/commons";

type Props = {
  format?: string;
  width?: number;
  variant?: "outlined" | "filled" | "standard";
  error?: boolean;
  helperText?: string;
  isRequired?: boolean;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  [x: string]: any;
};

export default function DatePickerCustom({
  format = DateFormat,
  width,
  variant = "outlined",
  error = false,
  helperText,
  isRequired = false,
  label,
  readOnly = false,
  disabled = false,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={datepickerTheme}>
        <div>
          <StyledLabel
            className={clsx("mb-2", !readOnly && isRequired && !disabled ? "required-field" : "")}
            id="select-label"
          >
            {label}
          </StyledLabel>

          <StyledDatePicker
            format={DateFormat}
            open={open}
            onClose={() => setOpen(false)}
            sx={{ width: width || "100%" }}
            className={isRequired && !rest.disabled ? "field-required" : ""}
            slotProps={{
              field: { clearable: true },
              textField: {
                variant: variant,
                error: error,
                helperText: helperText,
                onClick: () => setOpen(true),
              },
            }}
            {...rest}
          />
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

// Styled
const datepickerTheme = createTheme({
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
          width: "100%",
          // minWidth: 156,
          color: themeColors.colors.blackRgba87,
          "&::placeholder": {
            color: themeColors.colors.blackRgba38,
          },
        },
        root: {
          "&.Mui-selected": {
            backgroundColor: themeColors.colors.blue189,
          },
        },
      },
    },
  },
});

const StyledDatePicker = styled(DatePicker)`
  &.field-required label {
    top: -8px;
    &.MuiInputLabel-shrink {
      top: -4px;
    }
    &:after {
      content: "*";
      color: ${themeColors.colors.redD32};
      font-size: 20px;
      line-height: 30px;
      display: inline-block;
    }
  }
  .Mui-disabled {
    background-color: transparent !important;
    color: ${themeColors.colors.blackRgba38};
    &:before {
      border-bottom-style: solid !important;
    }
  }
  .MuiInputBase-root {
    &.Mui-disabled {
      -webkit-text-fill-color: ${themeColors.colors.blackRgba38};
      &:before {
        border-bottom-color: ${themeColors.colors.blackRgba26};
      }

      .MuiInputAdornment-root {
        margin-top: 0px !important;
      }
    }
  }
  .MuiInputBase-input {
    padding: 13.5px 14px;
    font-size: 14px;
    line-height: 20px;
    &::placeholder {
      font-size: 14px;
      line-height: 20px;
      color: ${themeColors.colors.gray5C6};
    }
    &.Mui-disabled {
      -webkit-text-fill-color: ${themeColors.colors.blackRgba38};
    }
  }
  .MuiFormLabel-root {
    top: -4px;
    font-size: 14px;
    line-height: 20px;
    &.Mui-disabled:not(.Mui-error) {
      color: ${themeColors.colors.blackRgba38};
    }
    &.MuiInputLabel-shrink {
      top: 0;
      &.Mui-disabled:not(.MuiInputLabel-outlined) {
        top: -16px;
      }
    }
  }
  .MuiFormHelperText-root.Mui-error {
    font-size: 14px;
    margin-left: 0;
  }
`;
