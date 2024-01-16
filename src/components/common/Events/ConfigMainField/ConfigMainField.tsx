import { useTranslations } from "next-intl";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { EventConfigMainFieldItem } from "../../../../models/Event";
import ConfigItemForm from "./ConfigItemForm";
import { StyledSecondaryButton } from "../../../../styles/commons";
import clsx from "clsx";

const { yupResolver } = require("@hookform/resolvers/yup");

export type FormConfigItemValue = {
  configItems: EventConfigMainFieldItem[];
};

type Props = {};

const ConfigMainFieldForm = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Yup && React Hook Form
  const ConfigItemSchema = yup.object().shape({
    configItems: yup.array().of(
      yup.object().shape({
        fieldName: yup.string().required(translation("SOURCE_LANGUAGE_IS_EMPTY")),
        description: yup.string().required(translation("TARGET_LANGUAGE_IS_EMPTY")),
        config: yup.object().shape({
          pc: yup.object().shape({
            display: yup.boolean().notRequired(),
            bold: yup.boolean().notRequired(),
            italic: yup.boolean().notRequired(),
            font: yup.string().notRequired(),
            fontSize: yup.string().notRequired(),
            width: yup.string().notRequired(),
            color: yup.string().notRequired(),
            align: yup.string().notRequired(),
            alignHorizontal: yup.string().notRequired(),
            alignVertical: yup.string().notRequired(),
          }),
          pda: yup.object().shape({
            display: yup.boolean().notRequired(),
            bold: yup.boolean().notRequired(),
            italic: yup.boolean().notRequired(),
            font: yup.string().notRequired(),
            fontSize: yup.string().notRequired(),
            width: yup.string().notRequired(),
            color: yup.string().notRequired(),
            align: yup.string().notRequired(),
            alignHorizontal: yup.string().notRequired(),
            alignVertical: yup.string().notRequired(),
          }),
        }),
      }),
    ),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    clearErrors,
  } = useForm<FormConfigItemValue>({
    mode: "onChange",
    resolver: yupResolver(ConfigItemSchema),
    defaultValues: {
      configItems: [],
    },
  });

  const {
    fields: configItemsFields,
    remove: configItemsRemove,
    append: configItemsAppend,
  } = useFieldArray({
    control,
    name: "configItems",
    shouldUnregister: false,
  });

  // ** Functions
  const handleAppendForm = () => {
    configItemsAppend({
      fieldName: "",
      description: "",
      config: {
        pc: {
          align: "",
          alignHorizontal: "",
          alignVertical: "",
          bold: false,
          color: "",
          display: false,
          font: "",
          fontSize: "",
          italic: false,
          width: "",
        },
        pda: {
          align: "",
          alignHorizontal: "",
          alignVertical: "",
          bold: false,
          color: "",
          display: false,
          font: "",
          fontSize: "",
          italic: false,
          width: "",
        },
      },
    });
  };

  return (
    <div className="grid gap-y-4">
      <div className="hidden grid-cols-12 md:grid gap-x-3">
        <div className="col-span-1">{translation("label.ordinalNumber")}</div>
        <div className="col-span-4">{translation("label.fieldName")}</div>
        <div className="col-span-4">{translation("label.description")}</div>
      </div>

      {configItemsFields.map((field, index, array) => (
        <div key={field.id} className={clsx(index < array.length - 1 && "pb-4 border-b-[1px] border-b-gray-300")}>
          <ConfigItemForm control={control} errors={errors} index={index} onRemove={configItemsRemove} />
        </div>
      ))}
      <StyledSecondaryButton variant="outlined" onClick={handleAppendForm}>
        <span className="font-semibold">{translation("action.appendField")}</span>
      </StyledSecondaryButton>
    </div>
  );
};

export default ConfigMainFieldForm;
