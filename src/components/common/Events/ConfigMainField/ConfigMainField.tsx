import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { AttributeFieldType, EventConfigFieldType, EventConfigTemplateType } from "../../../../models/Event";
import ConfigItemForm from "./ConfigItemForm";
import { StyledSecondaryButton } from "../../../../styles/commons";
import clsx from "clsx";
import { useAppSelector } from "../../../../redux/root/hooks";
import { selectCommon } from "../../../../redux/common/slice";

const { yupResolver } = require("@hookform/resolvers/yup");

export type FormConfigItemValue = {
  configItems: EventConfigFieldType[];
};

type Props = {
  defaultConfigFields: EventConfigFieldType[];
  templateFieldConfig?: EventConfigTemplateType;
};

const ConfigMainFieldForm = ({ defaultConfigFields, templateFieldConfig }: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Redux
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  // ** State
  const [defaultAttributeValue, setDefaultAttributeValue] = useState<AttributeFieldType>();

  // ** Yup && React Hook Form
  const generateFieldValidation = (value: any) => {
    switch (typeof value) {
      case "string":
        return yup.string().notRequired();
      case "boolean":
        return yup.boolean().notRequired();
      case "number":
        return yup.string().notRequired();
      default:
        return yup.mixed().notRequired();
    }
  };

  const generateValidationSchema = (eventFieldConfig: any) => {
    const schema = yup.object().shape({
      configItems: yup.array().of(
        yup.object().shape({
          field: yup.string().required("Field is required"),
          desc: yup.string().required("Description is required"),
          order: yup.number().required("Order is required"),
          is_main: yup.boolean().required("Is main is required"),
          attributes: yup.object().shape({
            desktop: yup
              .object()
              .shape(
                Object.fromEntries(
                  Object.entries(eventFieldConfig.attributes.desktop).map(([key, value]) => [
                    key,
                    generateFieldValidation(value),
                  ]),
                ),
              ),
            tablet: yup
              .object()
              .shape(
                Object.fromEntries(
                  Object.entries(eventFieldConfig.attributes.tablet).map(([key, value]) => [
                    key,
                    generateFieldValidation(value),
                  ]),
                ),
              ),
            mobile: yup
              .object()
              .shape(
                Object.fromEntries(
                  Object.entries(eventFieldConfig.attributes.mobile).map(([key, value]) => [
                    key,
                    generateFieldValidation(value),
                  ]),
                ),
              ),
          }),
        }),
      ),
    });

    return schema;
  };

  const ConfigItemSchema = defaultConfigFields.length > 0 ? generateValidationSchema(defaultConfigFields[0]) : null;

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
    if (defaultAttributeValue) {
      configItemsAppend({
        field: "",
        desc: "",
        is_main: false,
        order: 0,
        attributes: defaultAttributeValue,
      });
    }
  };

  const handleSetDefaultValue = () => {
    if (defaultConfigFields.length > 0) {
      for (let i = 0; i < defaultConfigFields.length; i++) {
        const element = defaultConfigFields[i];
        configItemsAppend({
          field: element.field,
          desc: element.desc,
          is_main: element.is_main,
          order: element.order,
          attributes: element.attributes,
        });
      }
    }
  };

  const handleGetDefaultAttributeValue = () => {
    if (templateFieldConfig) {
      let result: any = {};
      for (const key in templateFieldConfig.attributes) {
        result[key] = {};
        for (const attrKey in templateFieldConfig.attributes[key as "desktop" | "tablet" | "mobile"]) {
          result[key][attrKey] =
            templateFieldConfig.attributes[key as "desktop" | "tablet" | "mobile"][attrKey].default;
        }
      }

      setDefaultAttributeValue(result);
    }
  };

  useEffect(() => {
    handleSetDefaultValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfigFields.length]);

  useEffect(() => {
    handleGetDefaultAttributeValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateFieldConfig]);

  return (
    <div className="grid gap-y-4">
      <div className="hidden grid-cols-12 md:grid gap-x-3">
        <div className={clsx("col-span-1 lg:col-span-1", !isSideBarCollapse && "md:col-span-2")}>
          {translation("label.ordinalNumber")}
        </div>
        <div className={clsx("col-span-4 lg:col-span-4", !isSideBarCollapse && "md:col-span-5")}>
          {translation("label.fieldName")}
        </div>
        <div className={clsx("col-span-4 lg:col-span-4", !isSideBarCollapse && "md:col-span-5")}>
          {translation("label.description")}
        </div>
      </div>

      {configItemsFields.map((field, index, array) => (
        <div key={field.id} className={clsx(index < array.length - 1 && "pb-4 border-b-[1px] border-b-gray-300")}>
          <ConfigItemForm
            isMainField={field.is_main}
            templateConfigFields={templateFieldConfig}
            control={control}
            errors={errors}
            index={index}
            onRemove={configItemsRemove}
          />
        </div>
      ))}
      <StyledSecondaryButton variant="outlined" onClick={handleAppendForm}>
        <span className="font-semibold">{translation("action.appendField")}</span>
      </StyledSecondaryButton>
    </div>
  );
};

export default ConfigMainFieldForm;
