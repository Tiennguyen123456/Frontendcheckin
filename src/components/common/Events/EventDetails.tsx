import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import DatePickerCustom from "../Datepicker";
import SelectField from "../Select";
import Input from "../TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import StyledTextArea from "../TextField/TextArea";

const { yupResolver } = require("@hookform/resolvers/yup");

type Props = {};

type FormEventDetailsValue = {
  eventCode: string;
  startDate: string;
  endDate: string;
  company: string;
  address: string;
  eventDescription: string;
};

const defaultValue = {
  eventCode: "",
  startDate: "",
  endDate: "",
  company: "",
  address: "",
  eventDescription: "",
};

const EventDetails = (props: Props) => {
  // ** State
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();

  // ** I18n
  const translation = useTranslations();

  // ** React hook form
  const eventDetailsSchema = yup.object().shape({
    eventCode: yup.string().required(translation("error.requiredEventCode")),
    startDate: yup.date().required(translation("error.requiredStartDate")).typeError(translation("error.invalidDate")),
    endDate: yup.date().required(translation("error.requiredEndDate")).typeError(translation("error.invalidDate")),
    company: yup.string().required(translation("error.requiredCompany")),
    address: yup.string().notRequired(),
    eventDescription: yup.string().notRequired(),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormEventDetailsValue>({
    mode: "onChange",
    resolver: yupResolver(eventDetailsSchema),
    defaultValues: defaultValue,
  });

  // ** Functions
  const handleSubmitEventDetails = (values: FormEventDetailsValue) => {
    console.log("values: ", values);
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(handleSubmitEventDetails)}>
      <Controller
        control={control}
        name="eventCode"
        render={({ field }) => (
          <Input
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
        name="company"
        render={({ field }) => (
          <SelectField
            isRequired
            value={field.value}
            label={translation("label.company")}
            placeholder={translation("placeholder.company")}
            options={[]}
            error={Boolean(errors?.company?.message)}
            helperText={errors?.company?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DatePickerCustom
            isRequired
            value={field.value}
            label={translation("label.startDate")}
            error={Boolean(errors?.startDate?.message)}
            helperText={errors?.startDate?.message}
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
            value={field.value}
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
        name="eventDescription"
        render={({ field }) => (
          <StyledTextArea
            value={field.value}
            label={translation("label.eventDescription")}
            placeholder={translation("placeholder.eventDescription")}
            error={Boolean(errors?.eventDescription?.message)}
            helperText={errors?.eventDescription?.message}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </form>
  );
};

export default EventDetails;
