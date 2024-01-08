"use client";
import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
	ThemeProvider,
	createTheme,
	TextFieldProps,
	InputLabel,
	Box,
	IconButton,
} from "@mui/material";
import { error } from "console";
import { ReactNode, useState } from "react";

interface IInput {
	width?: number;
	label?: string;
	placeholder?: string;
	variant?: "outlined" | "filled" | "standard";
	value?: string;
	readOnly?: boolean;
	isRequired?: boolean;
	icon?: ReactNode;
	error?: boolean;
	helperText?: string;
	type?: "text" | "password";
	isPasswordInput?: boolean;
	onChange?: (value: string) => void;
	onBlur?: (value: string) => void;
}

function Input({
	width,
	label,
	placeholder,
	variant = "outlined",
	value = "",
	readOnly = false,
	isRequired = false,
	icon,
	error,
	helperText,
	type = "text",
	isPasswordInput = false,
	onChange = (value: string) => {},
	onBlur = (value: string) => {},
}: IInput) {
	const [isInputPassword, setIsInputPassword] = useState<boolean>(isPasswordInput);
	const [showPassword, setShowPassword] = useState<boolean>(type === "password" ? false : true);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const defaultInputProps = {
		sx: { width: "100%" },
		readOnly: readOnly,
	};

	let inputProps: any = icon
		? { ...defaultInputProps, startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }
		: defaultInputProps;

	inputProps = isInputPassword
		? {
				...inputProps,
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
		  }
		: inputProps;

	return (
		<ThemeProvider theme={textFieldTheme}>
			<Box
				sx={{
					width: width || "100%",
				}}
			>
				{label && <InputLabel className="mb-2">{label}</InputLabel>}

				<StyledTextField
					key={label}
					fullWidth={!width}
					className={!readOnly && isRequired ? "field-required" : ""}
					variant={variant}
					value={value}
					autoComplete="off"
					InputProps={inputProps}
					onChange={(e: any) => onChange(e.target.value)}
					onBlur={(e: any) => onBlur(e.target.value.trim())}
					error={error}
					helperText={helperText}
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
				/>
			</Box>
		</ThemeProvider>
	);
}

export default Input;

// Styled
const textFieldTheme = createTheme({
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
					minWidth: 156,
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

const StyledTextField = styled(TextField)`
	position: relative;

	&.field-required .MuiFormLabel-root {
		top: -8px;
		&:after {
			content: "*";
			color: ${themeColors.colors.redD32};
			font-size: 20px;
			line-height: 30px;
			display: inline-block;
		}
	}
	.MuiFormLabel-root {
		top: -3px;
		font-size: 14px;
		color: ${themeColors.colors.blackRgba87};
		&.Mui-disabled:not(.Mui-error) {
			color: ${themeColors.colors.blackRgba38};
		}
		&.MuiInputLabel-filled {
			top: -12px;
		}
	}
	.MuiInputBase-root {
		&.Mui-readOnly {
			background-color: transparent;
		}
		.MuiInputAdornment-root {
			&.MuiInputAdornment-positionStart {
				margin-top: 0;
			}
			svg {
				font-size: 18px;
			}
		}
	}
	.MuiInputBase-adornedStart {
		padding: 12px 14px;
	}
	.MuiInputBase-input {
		&::placeholder {
			font-size: 14px;
			color: ${themeColors.colors.gray5C6};
		}
		&.Mui-disabled {
			-webkit-text-fill-color: ${themeColors.colors.blackRgba38};
		}
		&.MuiInputBase-inputAdornedStart {
			padding: 0;
			height: auto;
		}
	}
	.MuiFormHelperText-root.Mui-error {
		// position: absolute;
		top: 100%;
		margin-left: 0;
		margin-right: 0;
		font-size: 14px;
	}
	.MuiInputBase-inputAdornedStart {
		padding-left: 0;
		min-width: auto;
	}
`;
