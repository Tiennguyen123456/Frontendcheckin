import BasicModal from "@/components/modal";
// import { createUserService, updateUserService } from "@/services/account";
import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import { toastError, toastSuccess } from "@/utils/toast";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomCheckbox from "../common/Checkbox";
import SelectField from "../common/Select";
import Input from "../common/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";

const { yupResolver } = require("@hookform/resolvers/yup");
const defaultValues = {
  name: "",
  username: "",
  email: "",
  role: "",
  status: "",
};

export default function UserModal({ show, dataEditing, onRefresh, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const translation = useTranslations();
  const [roles, setRoles] = useState<IRoleRes[]>([]);

  const handleGetRoles = async () => {
    const response = await authorityApi.getRoles();
    setRoles(response.collection);
  };

  const userSchema = yup.object().shape({
    name: yup.string(),
    // .required(messages["userModal.required.firstName"]),
    username: yup.string(),
    // .required(messages["userModal.required.lastName"]),
    email: yup.string(),
    // .required(messages["userModal.required.email"])
    // .matches(emailRegex, messages["agencyPage.form.regex.email"]),
    role: yup.string(),
    // .required(messages["userModal.required.role"]),
    status: yup.string(),
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

  const handleCreateEditUser = async (values: any) => {
    // try {
    //   setLoading(true);
    //   let message = "";
    //   const model = {
    //     name: values.email,
    //     username: values.firstName,
    //     email: values.lastName,
    //     role: values.role,
    //     status: values.status,
    //   };
    //   const response = dataEditing?.id
    //     ? await updateUserService(dataEditing?.id, model)
    //     : await createUserService(model);
    //   if (response.data?.success) {
    //     message = dataEditing?.id
    //       ? translation("successApi.UPDATE_ACCOUNT_SUCCESS")
    //       : translation("successApi.CREATE_ACCOUNT_SUCCESS");
    //     toastSuccess(message);
    //     setLoading(false);
    //     onClose();
    //     onRefresh();
    //   } else {
    //     message = dataEditing?.id
    //       ? translation("errorApi.UPDATE_ACCOUNT_FAILED")
    //       : translation("errorApi.CREATE_ACCOUNT_FAILED");
    //     toastError(message);
    //     setLoading(false);
    //   }
    // } catch (error: any) {
    //   // const result_info = error?.response?.data?.result_info;
    //   // if (result_info?.results?.[0]?.error_msg) {
    //   //   alertError(messages[result_info.results[0].error_msg]);
    //   // } else {
    //   //   alertError(messages[dataEditing ? "UPDATE_USER_FAILED" : "CREATE_USER_FAILED"]);
    //   // }
    //   toastError(error);
    //   setLoading(false);
    // }
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
    if (dataEditing) {
      reset({
        name: dataEditing.name,
        username: dataEditing.username,
        email: dataEditing.email,
        role: dataEditing.roles?.[0]?.name,
        status: dataEditing.enabled,
      });
    }
  }, [dataEditing]);

  return (
    <BasicModal
      title={dataEditing?.id ? translation("action.edit") : translation("action.create")}
      open={show}
      onClose={handleCloseModal}
      width={520}
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
            {dataEditing?.id ? translation("action.save") : translation("action.create")}
          </StyledPrimaryButton>
        </>
      }
    >
      <StyledFormSection id="userForm" onSubmit={handleSubmit(handleCreateEditUser)}>
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
              options={[...roles.map((role) => ({ label: role.name, value: role.name }))]}
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
              checked={field.value === "ACTIVE" ? true : false}
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
