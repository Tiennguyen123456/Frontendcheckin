import { ROUTES } from "@/constants/routes";
import { DateFormatServer, EventStatusOptions } from "@/constants/variables";
import useCustomRouter from "@/hooks/useCustomRouter";
import { ICompanyRes } from "@/models/api/company-api";
import { IEventRes } from "@/models/api/event-api";
import companyApi from "@/services/company-api";
import eventApi from "@/services/event-api";
import { toastError, toastSuccess } from "@/utils/toast";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import DatePickerCustom from "../Datepicker";
import SelectField from "../Select";
import Input from "../TextField";
import StyledTextArea from "../TextField/TextArea";

const { yupResolver } = require("@hookform/resolvers/yup");

type Props = {};

type FormEventDetailsValue = {
  eventCode: string;
  name: string;
  fromDate: string;
  endDate: string;
  company: string;
  location: string;
  description: string;
  status: string;
};

interface EventDetailsProps {
  eventDetail?: IEventRes;
  onRefetch: () => void;
}

const defaultValue = {
  eventCode: "",
  name: "",
  fromDate: "",
  endDate: "",
  company: "",
  location: "",
  description: "",
  status: EventStatusOptions[1].value,
};

const EventDetails = ({ eventDetail, onRefetch }: EventDetailsProps) => {
  const routerPushWithLocale = useCustomRouter();

  // ** State
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [companies, setCompanies] = useState<ICompanyRes[]>([]);

  // ** I18n
  const translation = useTranslations();

  // ** React hook form
  const eventDetailsSchema = yup.object().shape({
    eventCode: yup.string().required(translation("error.requiredEventCode")),
    name: yup.string().required(translation("error.requiredEventName")),
    fromDate: yup.date().required(translation("error.requiredStartDate")).typeError(translation("error.invalidDate")),
    endDate: yup.date().required(translation("error.requiredEndDate")).typeError(translation("error.invalidDate")),
    company: yup.string().required(translation("error.requiredCompany")),
    address: yup.string().notRequired(),
    eventDescription: yup.string().notRequired(),
  });

  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<FormEventDetailsValue>({
    mode: "onChange",
    resolver: yupResolver(eventDetailsSchema),
    defaultValues: defaultValue,
  });

  const handleBackToList = () => {
    routerPushWithLocale(ROUTES.EVENTS);
  };

  const handleGetCompanies = async () => {
    const response = await companyApi.getCompanies();
    setCompanies(response.collection);
  };

  // ** Functions
  const handleSubmitEventDetails = async (values: FormEventDetailsValue) => {
    try {
      setLoading(true);
      let body;
      if (eventDetail != null) {
        body = {
          id: eventDetail.id,
          company_id: values.company,
          code: values.eventCode,
          name: values.name,
          from_date: values.fromDate,
          end_date: values.endDate,
          company: values.company,
          location: values.location,
          description: values.description,
          status: values.status,
        };
      } else {
        body = {
          company_id: values.company,
          code: values.eventCode,
          name: values.name,
          from_date: dayjs(values.fromDate).format(DateFormatServer),
          end_date: dayjs(values.endDate).format(DateFormatServer),
          company: values.company,
          location: values.location,
          description: values.description,
          status: values.status,
          encrypt_file_link: false,
        };
      }

      const response = await eventApi.storeEvent(body);
      if (response.status === "success") {
        toastSuccess(
          eventDetail ? translation("successApi.UPDATE_EVENT_SUCCESS") : translation("successApi.CREATE_EVENT_SUCCESS"),
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
          eventDetail ? translation("successApi.UPDATE_EVENT_FAILED") : translation("errorApi.CREATE_EVENT_FAILED"),
        );
      }
    }
  };

  useEffect(() => {
    if (companies?.length === 0) handleGetCompanies();
  }, []);

  useEffect(() => {
    if (eventDetail) {
      reset({
        eventCode: eventDetail.code,
        name: eventDetail.name,
        fromDate: eventDetail.from_date,
        endDate: eventDetail.end_date,
        company: companies.find((company) => company.id === eventDetail.company_id)?.id?.toString(),
        location: eventDetail.location,
        description: eventDetail.description,
        status: eventDetail.status,
      });
    } else {
      reset(defaultValue);
    }
  }, [eventDetail]);

  return (
    <form className="grid gap-4 md:grid-cols-2" id="eventForm" onSubmit={handleSubmit(handleSubmitEventDetails)}>
      <Controller
        control={control}
        name="eventCode"
        render={({ field }) => (
          <Input
            disabled={eventDetail != null ? true : false}
            readOnly={eventDetail != null ? true : false}
            value={field.value}
            label={translation("label.eventCode")}
            placeholder={translation("placeholder.eventCode")}
            isRequired
            error={Boolean(errors?.eventCode?.message)}
            helperText={errors?.eventCode?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.eventName")}
            placeholder={translation("placeholder.eventName")}
            isRequired
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="fromDate"
        render={({ field }) => (
          <DatePickerCustom
            isRequired
            value={dayjs(field.value)}
            label={translation("label.startDate")}
            error={Boolean(errors?.fromDate?.message)}
            helperText={errors?.fromDate?.message}
            onChange={(value: any) => {
              field.onChange(value);
              setStartDate(value);
            }}
            maxDate={endDate && dayjs(endDate).subtract(1, "day")}
          />
        )}
      />

      <Controller
        control={control}
        name="endDate"
        render={({ field }) => (
          <DatePickerCustom
            isRequired
            value={dayjs(field.value)}
            label={translation("label.endDate")}
            error={Boolean(errors?.endDate?.message)}
            helperText={errors?.endDate?.message}
            onChange={(value: any) => {
              field.onChange(value);
              setEndDate(value);
            }}
            minDate={startDate && dayjs(startDate).add(1, "day")}
          />
        )}
      />

      <Controller
        control={control}
        name="company"
        render={({ field }) => (
          <SelectField
            isRequired
            value={field.value}
            label={translation("label.company")}
            placeholder={translation("placeholder.company")}
            options={companies.map((company) => ({ label: company.name, value: company.id }))}
            error={Boolean(errors?.company?.message)}
            helperText={errors?.company?.message}
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
            options={EventStatusOptions}
            error={Boolean(errors?.status?.message)}
            helperText={errors?.status?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.address")}
            placeholder={translation("placeholder.address")}
            error={Boolean(errors?.location?.message)}
            helperText={errors?.location?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      {/* <Controller
        control={control}
        name="eventDescription"
        render={({ field }) => (
          <Input
            value={field.value}
            label={translation("label.eventDescription")}
            placeholder={translation("placeholder.eventDescription")}
            error={Boolean(errors?.eventDescription?.message)}
            helperText={errors?.eventDescription?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      /> */}
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <StyledTextArea
            value={field.value}
            label={translation("label.eventDescription")}
            placeholder={translation("placeholder.eventDescription")}
            error={Boolean(errors?.description?.message)}
            helperText={errors?.description?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </form>
  );
};

export default EventDetails;
