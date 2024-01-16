import { ROUTES } from "@/constants/routes";
import { CompanyStatus, numberRegex } from "@/constants/variables";
import useCustomRouter from "@/hooks/useCustomRouter";
import { ICompanyRes } from "@/models/api/company-api";
import companyApi from "@/services/company-api";
import { toastError, toastSuccess } from "@/utils/toast";
import { randomUUID } from "crypto";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SelectField from "../Select";
import Input from "../TextField";

const { yupResolver } = require("@hookform/resolvers/yup");

type FormEventDetailsValue = {
  name: string;
  website: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  city: string;
  limitedUsers: string;
  limitedEvents: string;
  limitedCampaigns: string;
  status: string;
};

const defaultValue = {
  name: "",
  website: "",
  contactPhone: "",
  contactEmail: "",
  address: "",
  city: "",
  limitedUsers: "",
  limitedEvents: "",
  limitedCampaigns: "",
  status: CompanyStatus[0].value,
};

interface CompanyDetailsProps {
  companyDetail?: ICompanyRes;
  onRefetch: () => void;
}

const CompanyDetails = ({ companyDetail, onRefetch }: CompanyDetailsProps) => {
  const [loading, setLoading] = useState(false);
  const routerPushWithLocale = useCustomRouter();

  // ** I18n
  const translation = useTranslations();

  // ** React hook form
  const eventDetailsSchema = yup.object().shape({
    name: yup.string().required(translation("error.requiredName")),
    status: yup.string().required(translation("error.requiredStatus")),
    limitedEvents: yup.string().matches(numberRegex, translation("error.invalidEvent")),
    limitedUsers: yup.string().matches(numberRegex, translation("error.invalidUser")),
    limitedCampaigns: yup.string().matches(numberRegex, translation("error.invalidCampaign")),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<FormEventDetailsValue>({
    mode: "onChange",
    resolver: yupResolver(eventDetailsSchema),
    defaultValues: defaultValue,
  });

  const handleBackToList = () => {
    routerPushWithLocale(ROUTES.COMPANIES);
  };

  // ** Functions
  const handleSubmitEventDetails = async (values: FormEventDetailsValue) => {
    try {
      setLoading(true);
      let body;
      if (companyDetail != null) {
        body = {
          id: companyDetail.id,
          name: values.name,
          website: values.website,
          contact_phone: values.contactPhone,
          contact_email: values.contactEmail,
          address: values.address,
          city: values.city,
          limited_users: values.limitedUsers,
          limited_events: values.limitedEvents,
          limited_campaigns: values.limitedCampaigns,
          status: values.status,
        };
      } else {
        body = {
          name: values.name,
          code: (Math.random() + 1).toString(36).substring(7),
          website: values.website,
          contact_phone: values.contactPhone,
          contact_email: values.contactEmail,
          address: values.address,
          city: values.city,
          limited_users: values.limitedUsers,
          limited_events: values.limitedEvents,
          limited_campaigns: values.limitedCampaigns,
          status: values.status,
        };
      }

      const response = await companyApi.storeCompany(body);
      if (response.status === "success") {
        toastSuccess(
          companyDetail
            ? translation("successApi.UPDATE_COMPANY_SUCCESS")
            : translation("successApi.CREATE_COMPANY_SUCCESS"),
        );
        onRefetch();
        handleBackToList();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("error: ", error);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(
          companyDetail
            ? translation("successApi.UPDATE_COMPANY_FAILED")
            : translation("errorApi.CREATE_COMPANY_FAILED"),
        );
      }
    }
  };

  useEffect(() => {
    if (companyDetail) {
      reset({
        name: companyDetail.name,
        website: companyDetail.website,
        contactPhone: companyDetail.contact_phone,
        contactEmail: companyDetail.contact_email,
        address: companyDetail.address,
        limitedUsers: companyDetail.limited_users != null ? companyDetail.limited_users.toString() : "",
        limitedEvents: companyDetail.limited_events != null ? companyDetail.limited_events.toString() : "",
        limitedCampaigns: companyDetail.limited_campaigns != null ? companyDetail.limited_campaigns.toString() : "",
        status: companyDetail.status,
      });
    } else {
      reset(defaultValue);
    }
  }, [companyDetail]);

  return (
    <form className="grid gap-4 md:grid-cols-2" id="companyForm" onSubmit={handleSubmit(handleSubmitEventDetails)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.name")}
            placeholder={translation("placeholder.name")}
            isRequired
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="website"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.website")}
            placeholder={translation("placeholder.website")}
            error={Boolean(errors?.website?.message)}
            helperText={errors?.website?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="contactEmail"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.email")}
            placeholder={translation("placeholder.email")}
            error={Boolean(errors?.contactEmail?.message)}
            helperText={errors?.contactEmail?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="contactPhone"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.phone")}
            placeholder={translation("placeholder.phone")}
            error={Boolean(errors?.contactPhone?.message)}
            helperText={errors?.contactPhone?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.address")}
            placeholder={translation("placeholder.address")}
            error={Boolean(errors?.address?.message)}
            helperText={errors?.address?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <SelectField
            value={field.value}
            label={translation("label.status")}
            options={CompanyStatus}
            error={Boolean(errors?.status?.message)}
            helperText={errors?.status?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="limitedEvents"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.limitEvent")}
            placeholder={translation("placeholder.limitEvent")}
            error={Boolean(errors?.limitedEvents?.message)}
            helperText={errors?.limitedEvents?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="limitedUsers"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.limitUser")}
            placeholder={translation("placeholder.limitUser")}
            error={Boolean(errors?.limitedUsers?.message)}
            helperText={errors?.limitedUsers?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        control={control}
        name="limitedCampaigns"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.limitCampaign")}
            placeholder={translation("placeholder.limitCampaign")}
            error={Boolean(errors?.limitedCampaigns?.message)}
            helperText={errors?.limitedCampaigns?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </form>
  );
};

export default CompanyDetails;
