"use client";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { themeColors } from "../../theme/theme";
import { Box } from "@mui/material";

export const StyledPrimaryButton = styled(LoadingButton)`
	background-color: ${(props) => props.sx?.backgroundColor || themeColors.colors.blackRgba87};
	padding: 13.5px 16px;

	color: ${(props) => props.color || themeColors.colors.whiteFFF};
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
	text-transform: uppercase;
	text-align: center;

	border-radius: 4px;
	box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
		0px 1px 5px 0px rgba(0, 0, 0, 0.12);
	&:hover {
		opacity: 0.8;
		background-color: ${(props) => props.sx?.backgroundColor || themeColors.colors.blackRgba87};
	}
	&:disabled {
		opacity: 0.6;
		color: ${(props) => props.color || themeColors.colors.whiteFFF};
	}

	& .MuiLoadingButton-loadingIndicatorStart {
		position: static;
		margin-right: 8px;
	}
`;

export const StyledSecondaryButton = styled(LoadingButton)`
	padding: 12.5px 16px;
	border: 1px solid ${(props) => props?.textColor || themeColors.colors.blackRgba87};
	border-radius: 4px;
	background-color: ${themeColors.colors.whiteFFF};

	color: ${(props) => props?.textColor || themeColors.colors.blackRgba87};
	font-size: 14px;
	line-height: 20px;
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;
	&.color-red {
		color: ${themeColors.colors.redD32};
	}

	&:hover {
		opacity: 0.8;
		background-color: ${themeColors.colors.whiteFFF};
	}

	&:disabled {
		opacity: 0.8;
		border-color: ${themeColors.colors.blackRgba32};
	}

	& .MuiLoadingButton-loadingIndicatorStart {
		position: static;
		margin-right: 8px;
	}
`;

export const StyledForm = styled.form`
	padding-top: 16px;
	display: flex;
	flex-direction: column;
	row-gap: 16px;
`;

export const StyledFormGroup = styled.div`
	display: flex;
	align-items: center;

	position: relative;
`;
export const StyledFormItem = styled.div`
	width: calc(50% - 8px);
	position: relative;
`;

export const StyledSeePassword = styled(Box)`
	position: absolute;
	right: 12px;
	top: 24px;
	transform: translate(0, -50%);

	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	svg {
		color: ${themeColors.colors.blackRgba60};
	}
`;
