import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { Autocomplete, FormControl, FormHelperText, InputLabel } from "@mui/material";
import Input from "../TextField";
import { StyledLabel } from "../../../styles/commons";
import clsx from "clsx";

type Props = {
  label?: string;
  options: any;
  value: any;
  variantInput?: "outlined" | "filled" | "standard";
  disabled?: boolean;
  isRequired?: boolean;
  error?: boolean;
  helperText?: string;
  noBorder?: boolean;
  onChange: (value: any) => void;
  onInputChange?: (value: any) => void;
  [x: string]: any;
};

function AutoComplete({
  label,
  options = [],
  value = "",
  variantInput = "outlined",
  disabled,
  isRequired,
  error,
  helperText,
  noBorder = false,
  onChange,
  onInputChange,
  ...rest
}: Props) {
  return (
    <StyledFormControl fullWidth error={error}>
      {label && <StyledLabel className={clsx("mb-2", isRequired && "field-required")}>{label}</StyledLabel>}

      <StyledAutocomplete
        className={`${error ? "has-error" : ""} ${isRequired ? "field-required" : ""} ${noBorder ? "no-border" : ""}`}
        fullWidth
        options={options}
        value={value}
        disabled={disabled}
        freeSolo
        getOptionLabel={(option: any) => option.label || ""}
        isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
        onChange={(_, data) => onChange(data)}
        onInputChange={(e: any) => (onInputChange ? onInputChange(e?.target?.value) : {})}
        renderInput={(params) => (
          <Input onChange={(value) => {}} variant={variantInput} placeholder={rest?.placeholder} {...params} />
        )}
        {...rest}
      />
      {helperText && <StyledHelperText sx={{ marginLeft: 0 }}>{helperText}</StyledHelperText>}
    </StyledFormControl>
  );
}

export default AutoComplete;

// Styled
const StyledAutocomplete = styled(Autocomplete)`
  &.has-error {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${themeColors.colors.redD32};
    }
    .MuiFormLabel-root {
      color: ${themeColors.colors.redD32};
    }
  }
  &.no-border .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
  &.field-required .MuiFormLabel-root {
    top: -6px;
    &.MuiInputLabel-filled {
      top: -8px;
    }
    &:after {
      content: "*";
      font-size: 20px;
      line-height: 28px;
      color: ${themeColors.colors.redD32};
      display: inline-block;
    }
  }
  .MuiFormLabel-root {
    font-size: 14px;
    color: ${themeColors.colors.blackRgba87};
  }
  .MuiInputBase-root {
    background-color: transparent;
  }
  /* .MuiInputBase-input {
    font-size: 14px;
    line-height: 20px;
  } */
`;
const StyledFormControl = styled(FormControl)`
  .MuiFormHelperText-root.Mui-error {
    margin-right: 0;
  }
`;
const StyledHelperText = styled(FormHelperText)`
  .MuiFormHelperText-root.Mui-error {
    margin-right: 0;
  }
`;
