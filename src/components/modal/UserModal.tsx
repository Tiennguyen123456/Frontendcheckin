import BasicModal from "@/components/modal";
// import { createUserService, updateUserService } from "@/services/account";
import { AccountStatus } from "@/constants/enum";
import { emailRegex } from "@/constants/variables";
import { IAccountRes } from "@/models/api/account-api";
import { IRoleRes } from "@/models/api/authority-api";
import accountApi from "@/services/account-api";
import authorityApi from "@/services/authority-api";
import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import { toastError, toastSuccess } from "@/utils/toast";
import styled from "@emotion/styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomCheckbox from "../common/Checkbox";
import SelectField from "../common/Select";
import Input from "../common/TextField";

const { yupResolver } = require("@hookform/resolvers/yup");

type Props = {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  defaultUser: IAccountRes | undefined;
};

const defaultValues = {
  name: "",
  username: "",
  email: "",
  role: "",
  status: false,
};

export default function UserModal({ show, onClose, onRefresh, defaultUser }: Props) {
  const [loading, setLoading] = useState(false);
  const translation = useTranslations();
  const [isEdit, setIsEdit] = useState(false);
  const [roles, setRoles] = useState<IRoleRes[]>([]);

  const handleGetRoles = async () => {
    const response = await authorityApi.getRoles();
    setRoles(response.collection);
  };

  const userSchema = yup.object().shape({
    name: yup.string().required(translation("error.requiredName")),
    username: yup.string().required(translation("error.requiredUserName")),
    email: yup
      .string()
      .required(translation("error.requiredEmail"))
      .matches(emailRegex, translation("error.invalidEmail")),
    role: yup.string().required(translation("error.requiredRoleName")),
    status: yup.bool(),
  });

  const {
    formState: { errors },
    control,
    clearErrors,
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
    defaultValues: defaultValues,
  });

  const handleStoreUser = async (values: any) => {
    try {
      setLoading(true);

      let response: IResponse<IAccountRes>;

      if (isEdit) {
        const body = {
          id: defaultUser?.id,
          role_id: values.role,
          name: values.name,
          username: values.username,
          email: values.email,
          status: values.status === true ? AccountStatus.Active : AccountStatus.New,
        };
        response = await accountApi.storeUser(body);
      } else {
        const body = {
          role_id: values.role,
          name: values.name,
          username: values.username,
          email: values.email,
          status: values.status === true ? AccountStatus.Active : AccountStatus.New,
        };

        response = await accountApi.storeUser(body);
      }
      if (response.status === "success") {
        onRefresh();
        toastSuccess(
          isEdit ? translation("successApi.UPDATE_ACCOUNT_SUCCESS") : translation("successApi.CREATE_ACCOUNT_SUCCESS"),
        );
        handleCloseModal();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("error: ", error);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        isEdit
          ? toastError(translation("errorApi.UPDATE_ACCOUNT_FAILED"))
          : toastError(translation("errorApi.CREATE_ACCOUNT_FAILED"));
      }
    }
  };

  useEffect(() => {
    if (roles?.length === 0) handleGetRoles();
  }, []);

  const handleCloseModal = () => {
    reset(defaultValues);
    clearErrors();
    onClose();
  };

  useEffect(() => {
    if (defaultUser && roles?.length > 0) {
      setIsEdit(true);
      reset({
        name: defaultUser.name,
        username: defaultUser.username,
        email: defaultUser.email,
        role:
          defaultUser.roles && defaultUser.roles.length > 0
            ? roles.find((item) => item.name === defaultUser.roles[0])?.id.toString()
            : "",

        status: defaultUser.status === AccountStatus.Active ? true : false,
      });
    } else {
      setIsEdit(false);
      reset(defaultValues);
    }
  }, [defaultUser, roles.length]);

  return (
    <BasicModal
      title={isEdit ? translation("action.edit") : translation("action.create")}
      open={show}
      onClose={handleCloseModal}
      footer={
        <>
          <StyledSecondaryButton
            size="medium"
            startIcon={<HighlightOffIcon />}
            sx={{ color: themeColors.colors.redD32 }}
            onClick={handleCloseModal}
          >
            {translation("action.cancel")}
          </StyledSecondaryButton>
          <StyledPrimaryButton loading={loading} loadingPosition="start" form="userForm" type="submit">
            {isEdit ? translation("action.save") : translation("action.create")}
          </StyledPrimaryButton>
        </>
      }
    >
      <StyledFormSection id="userForm" onSubmit={handleSubmit(handleStoreUser)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              isRequired
              value={field.value}
              fullWidth
              label={translation("label.name")}
              placeholder={translation("placeholder.name")}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              isRequired
              value={field.value}
              fullWidth
              label={translation("label.username")}
              placeholder={translation("placeholder.username")}
              error={Boolean(errors?.username?.message)}
              helperText={errors?.username?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              isRequired
              value={field.value}
              fullWidth
              label={translation("label.email")}
              placeholder={translation("placeholder.email")}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <SelectField
              isRequired
              value={field.value}
              options={[...roles.map((role) => ({ label: role.name, value: role.id }))]}
              fullWidth
              label={translation("label.role")}
              error={Boolean(errors?.role?.message)}
              helperText={errors?.role?.message}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <CustomCheckbox
              label={translation("label.status")}
              checked={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </StyledFormSection>
    </BasicModal>
  );
}

const StyledFormSection = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
