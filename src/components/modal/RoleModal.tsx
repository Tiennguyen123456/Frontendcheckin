import CustomCheckbox from "@/components/common/Checkbox";
import Input from "@/components/common/TextField";
import BasicModal from "@/components/modal";
import { IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";
// import { roleRegex } from "@/constants/variables";
// import { getListRoles } from "@/redux/accounts/actions";
// import { createAuthorityService, editAuthorityService } from "@/services/authority";
import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import { toastError, toastSuccess } from "@/utils/toast";
import styled from "@emotion/styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// const { hasPrefixRole, onlyUppercaseAnd, twoUnderscoreNotNextToEachOther } = roleRegex;

const { yupResolver } = require("@hookform/resolvers/yup");

const StyledFormSection = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default function RoleModal({ show, onClose, onRefetch, role }: any) {
  // const { messages } = useIntl();
  // ** I18n
  const translation = useTranslations();
  const [roles, setRoles] = useState<IRoleRes[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const RoleSchema = yup.object().shape({
    title: yup.string(),
    // .required(messages["ROLE_TITLE_IS_EMPTY"])
    name: yup.string(),
    // .required(messages["ROLE_NAME_IS_EMPTY"])
    // .matches(hasPrefixRole, messages["ROLE_NAME_IS_INVALID"])
    // .matches(onlyUppercaseAnd, messages["ROLE_NAME_ONLY_ACCEPT_UPPERCASE_AND_UNDERSCORE"])
    // .matches(twoUnderscoreNotNextToEachOther, messages["ROLE_NAME_NOT_ACCEPT_2_UNDERSCORE_NEXT_TO_EACH_OTHER"]),
    enable: yup.string(),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(RoleSchema),
    defaultValues: {
      id: null,
      name: "",
      guard_name: "",
      enable: false,
    },
  });

  const handleGetListRoles = async () => {
    const response = await authorityApi.getRoles();
    setRoles(response.collection);
  };

  const handleCloseModal = () => {
    // reset form
    reset({ id: null, name: "", guard_name: "", enable: false });
    setIsEdit(false);
    onClose();
  };

  const handleSubmitRole = async (values: any) => {
    try {
      setLoading(true);

      let response: IResponse<IRoleRes>;

      if (isEdit) {
        const body = {
          id: values.id,
          name: values.name,
          guard_name: values.guard_name,
          enable: values.enable,
        };
        response = await authorityApi.storeRole(body);
      } else {
        const body = {
          name: values.name,
          guard_name: values.guard_name,
          enable: values.enable,
        };

        response = await authorityApi.storeRole(body);
      }
      if (response.status === "success") {
        onRefetch();
        toastSuccess(
          isEdit
            ? translation("rolesPage.roleModal.action.UPDATE_ROLE_SUCCESS")
            : translation("rolesPage.roleModal.action.CREATE_ROLE_SUCCESS"),
        );
        handleCloseModal();
        handleGetListRoles();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      // const { result_info } = error.response.data;
      // if (result_info.results?.[0]?.error_msg) {
      //   toastError(result_info.results?.[0]?.error_msg);
      // } else {
      isEdit
        ? translation("rolesPage.roleModal.action.UPDATE_ROLE_FAILED")
        : translation("rolesPage.roleModal.action.CREATE_ROLE_FAILED");
      // }
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (role) {
      console.log("role: ", role);

      setIsEdit(true);
      reset({
        id: role.id,
        enable: role.enable,
        name: role.name,
        guard_name: role.guard_name,
      });
    } else {
      setIsEdit(false);
      reset();
    }
  }, [role]);

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
          <StyledPrimaryButton loading={loading} loadingPosition="start" form="RoleForm" type="submit">
            {isEdit ? translation("action.save") : translation("action.create")}
          </StyledPrimaryButton>
        </>
      }
    >
      <StyledFormSection id="RoleForm" onSubmit={handleSubmit(handleSubmitRole)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              isRequired
              value={field.value}
              fullWidth
              label={translation("rolesPage.roleModal.label.name")}
              placeholder={translation("rolesPage.roleModal.placeholder.name")}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="guard_name"
          render={({ field }) => (
            <Input
              isRequired
              disabled={isEdit}
              value={field.value}
              fullWidth
              label={translation("rolesPage.roleModal.label.guardName")}
              placeholder={translation("rolesPage.roleModal.placeholder.guardName")}
              error={Boolean(errors?.guard_name?.message)}
              helperText={errors?.guard_name?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="enable"
          render={({ field }) => (
            <CustomCheckbox
              label={translation("rolesPage.roleModal.active")}
              checked={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </StyledFormSection>
    </BasicModal>
  );
}
