import CustomCheckbox from "@/components/common/Checkbox";
import Input from "@/components/common/TextField";
import BasicModal from "@/components/modal";
import { IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";
import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import { toastError, toastSuccess } from "@/utils/toast";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const { yupResolver } = require("@hookform/resolvers/yup");

const StyledFormSection = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

type Props = {
  show: boolean;
  onClose: () => void;
  onRefetch: () => void;
  defaultRole: IRoleRes | undefined;
};

type FormRoleValue = {
  name: string;
  guardName: string;
  enabled: boolean;
};

export default function RoleModal({ show, onClose, onRefetch, defaultRole }: Props) {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const RoleSchema = yup.object().shape({
    name: yup.string().required(translation("error.requiredRoleName")),
    guardName: yup.string().required(translation("error.requiredGuardName")),
    enable: yup.boolean().notRequired(),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<FormRoleValue>({
    mode: "onChange",
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      name: "",
      guardName: "",
      enabled: false,
    },
  });

  const handleCloseModal = () => {
    // reset form
    reset();
    setIsEdit(false);
    onClose();
  };

  const handleSubmitRole = async (values: FormRoleValue) => {
    try {
      setLoading(true);

      let response: IResponse<IRoleRes>;

      if (isEdit) {
        const body = {
          id: defaultRole?.id,
          name: values.name,
          guard_name: values.guardName,
          enable: values.enabled,
        };
        response = await authorityApi.storeRole(body);
      } else {
        const body = {
          name: values.name,
          guard_name: values.guardName,
          enable: values.enabled,
        };

        response = await authorityApi.storeRole(body);
      }
      if (response.status === "success") {
        onRefetch();
        toastSuccess(
          isEdit ? translation("successApi.UPDATE_ROLE_SUCCESS") : translation("successApi.CREATE_ROLE_SUCCESS"),
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
          ? toastError(translation("errorApi.UPDATE_ROLE_FAILED"))
          : toastError(translation("errorApi.CREATE_ROLE_FAILED"));
      }
    }
  };

  useEffect(() => {
    if (defaultRole) {
      setIsEdit(true);
      reset({
        enabled: defaultRole.enable ? true : false,
        name: defaultRole.name,
        guardName: defaultRole.guard_name,
      });
    } else {
      setIsEdit(false);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRole]);

  return (
    <BasicModal
      title={isEdit ? translation("action.edit") : translation("action.create")}
      open={show}
      onClose={handleCloseModal}
      footer={
        <>
          <StyledSecondaryButton size="medium" onClick={handleCloseModal}>
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
          name="guardName"
          render={({ field }) => (
            <Input
              isRequired
              disabled={isEdit}
              value={field.value}
              fullWidth
              label={translation("rolesPage.roleModal.label.guardName")}
              placeholder={translation("rolesPage.roleModal.placeholder.guardName")}
              error={Boolean(errors?.guardName?.message)}
              helperText={errors?.guardName?.message}
              onChange={(value) => field.onChange(value)}
              onBlur={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          control={control}
          name="enabled"
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
