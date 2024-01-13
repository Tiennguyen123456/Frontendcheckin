"use client";
import { StyledLabel, StyledMenuItem } from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { FormControl, FormHelperText, Select, ThemeProvider, createTheme } from "@mui/material";
import clsx from "clsx";
import { IOption } from "../../../models/Select";

const selectTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.colors.blackRgba60,
    },
  },
  components: {
    MuiSelect: {
      defaultProps: {
        displayEmpty: true,
      },
    },
  },
});

type Props = {
  [x: string]: any;
  label?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  options?: IOption[];
  error?: boolean;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  onChange: (value: string) => void;
};

function SelectField({
  label,
  placeholder,
  value,
  disabled,
  readOnly = false,
  isRequired = false,
  options = [],
  error = false,
  helperText = "",
  variant = "outlined",
  onChange,
  ...rest
}: Props) {
  return (
    <ThemeProvider theme={selectTheme}>
      <FormControl fullWidth variant={variant} error={error}>
        <StyledLabel
          className={clsx("mb-2", !readOnly && isRequired && !disabled ? "required-field" : "")}
          id="select-label"
        >
          {label}
        </StyledLabel>

        <StyledSelect
          labelId="select-label"
          id="glohow-select"
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(e: any) => onChange(e.target.value)}
          autoFocus={false}
          {...rest}
        >
          {options.length > 0 &&
            options.map((opt) => (
              <StyledMenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </StyledMenuItem>
            ))}
        </StyledSelect>
        {helperText && <FormHelperText sx={{ marginLeft: 0, fontSize: "14px" }}>{helperText}</FormHelperText>}
      </FormControl>
    </ThemeProvider>
  );
}

export default SelectField;

// Styled
const StyledSelect = styled(Select)`
  position: relative;
  #glohow-select {
    padding: 12px 14px;
    color: ${themeColors.colors.blackRgba87};
    -webkit-text-fill-color: ${themeColors.colors.blackRgba87};
    &.Mui-disabled {
      color: ${themeColors.colors.blackRgba38};
      -webkit-text-fill-color: ${themeColors.colors.blackRgba38};
    }
  }
  &.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: ${themeColors.colors.blackRgba26};
  }
  &.Mui-disabled {
    background-color: transparent;
    &:before {
      border-bottom-style: solid;
      border-bottom-color: ${themeColors.colors.blackRgba26};
    }
  }
  &.Mui-readOnly {
    background-color: transparent;
  }
`;
