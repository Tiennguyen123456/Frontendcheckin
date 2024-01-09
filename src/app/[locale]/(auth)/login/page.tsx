"use client";
import CustomCheckbox from "@/components/common/Checkbox";
import Input from "@/components/common/TextField";
import { StyledForm, StyledFormGroup, StyledPrimaryButton } from "@/styles/commons";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { emailRegex, passwordRegex } from "@/constants/variables";
import LocaleSwitcherSelect from "@/components/common/Select/LocaleSwitcherSelect";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../../constants/routes";
import authApi from "../../../../services/auth-api";
import { useState } from "react";
import { setAxiosAuthorization } from "../../../../configs/axios.config";
import { toastError } from "../../../../utils/toast";

const { yupResolver } = require("@hookform/resolvers/yup");

type Props = {};

type LoginFormValue = {
	email: string;
	password: string;
	rememberMe: boolean;
};

const LoginPage = (props: Props) => {
	// ** State
	const [loading, setLoading] = useState(false);

	// ** I18n
	const translation = useTranslations();

	// ** Router
	const router = useRouter();

	// ** React hook form
	const loginSchema = yup.object().shape({
		email: yup
			.string()
			.required(translation("error.requiredEmail"))
			.matches(emailRegex, translation("error.invalidEmail")),
		password: yup.string().required(translation("error.requiredPassword")),
		// .matches(passwordRegex, translation("error.invalidPassword")),
		rememberMe: yup.boolean().notRequired(),
	});

	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm<LoginFormValue>({
		mode: "onChange",
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	// ** Functions
	const handleLogin = async (values: LoginFormValue) => {
		try {
			setLoading(true);
			const response = await authApi.login({
				email: values.email,
				password: values.password,
			});

			if (response.data.status === "success") {
				Cookies.set("authorization", response.data.data.access_token);
				setAxiosAuthorization(response.data.data.access_token);
			}
			router.push(ROUTES.DASHBOARD);
			setLoading(false);
		} catch (error: any) {
			const data = error?.response?.data;
			if (data?.message_code) {
				toastError(translation(`errorApi.${data?.message_code}`));
			} else {
				toastError(translation("errorApi.LOGIN_FAILED"));
			}
			setLoading(false);
			console.log("error: ", error);
		}
	};

	return (
		<div className="min-h-dvh w-full flex items-center px-3 flex-col md:flex-row md:p-0 md:justify-center bg-slate-100 relative">
			<div className="static flex w-full justify-end mt-5 mb-8 md:w-fit md:m-0 md:block md:absolute md:top-3 md:right-3">
				<LocaleSwitcherSelect />
			</div>
			<div className="flex flex-col w-full mb-20 md:w-fit">
				<div className="flex justify-center">
					<Image className="mix-blend-multiply" src={require("@/assets/images/Delfi_Logo.png")} alt="logo" />
				</div>

				<div className="rounded-lg drop-shadow-lg bg-white mt-6">
					<div className="py-4 text-center border-b-[1px] border-b-gray-200">
						<span className="font-semibold text-xl">{translation("loginPage.title")}</span>
					</div>

					<StyledForm
						className="p-6 flex flex-col gap-y-3 w-full md:w-[400px]"
						onSubmit={handleSubmit(handleLogin)}
					>
						<StyledFormGroup>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<Input
										value={field.value}
										label={translation("label.email")}
										placeholder={translation("placeholder.email")}
										isRequired
										error={Boolean(errors?.email?.message)}
										helperText={errors?.email?.message}
										onChange={(value) => field.onChange(value)}
									/>
								)}
							/>
						</StyledFormGroup>

						<StyledFormGroup>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<>
										<Input
											label={translation("label.password")}
											placeholder={translation("placeholder.password")}
											type={"password"}
											isPasswordInput
											isRequired
											value={field.value}
											error={Boolean(errors?.password?.message)}
											helperText={errors?.password?.message}
											onChange={(value) => field.onChange(value)}
										/>
									</>
								)}
							/>
						</StyledFormGroup>

						<Controller
							control={control}
							name="rememberMe"
							render={({ field }) => (
								<>
									<CustomCheckbox
										label={translation("loginPage.rememberMe")}
										checked={field.value}
										onChange={(value) => field.onChange(value)}
									/>
								</>
							)}
						/>

						<StyledPrimaryButton loading={loading} loadingPosition="start" type="submit">
							{translation("action.login")}
						</StyledPrimaryButton>
					</StyledForm>
				</div>
			</div>

			<div className="absolute bottom-5 -translate-x-1/2 left-1/2 whitespace-nowrap">{`© ${dayjs().year()} Delfi Technologies VietNam`}</div>
		</div>
	);
};

export default LoginPage;

// Styled
const StyledLoginForm = styled(StyledForm)`
	width: 100%;
	padding: 16px 24px;
	row-gap: 24px;
`;
