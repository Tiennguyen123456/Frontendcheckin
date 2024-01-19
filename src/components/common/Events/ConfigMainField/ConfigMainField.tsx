import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { AttributeFieldType, EventConfigFieldType, EventConfigTemplateType } from "../../../../models/Event";
import ConfigItemForm from "./ConfigItemForm";
import { StyledSecondaryButton } from "../../../../styles/commons";
import clsx from "clsx";
import { useAppSelector } from "../../../../redux/root/hooks";
import { selectCommon } from "../../../../redux/common/slice";
import { numberRegex } from "../../../../constants/variables";
import { toastError, toastSuccess } from "../../../../utils/toast";
import eventApi from "../../../../services/event-api";
import { IDeleteEventConfigFields } from "../../../../models/api/event-api";

const { yupResolver } = require("@hookform/resolvers/yup");

export type FormConfigItemValue = {
  configItems: EventConfigFieldType[];
  isDuplicate: boolean;
};

type Props = {
  eventId: number;
  defaultConfigFields: EventConfigFieldType[];
  templateFieldConfig?: EventConfigTemplateType;
  isSubmitForm: boolean;
  onSubmit: (value: EventConfigFieldType[]) => void;
  onRefetchData: () => void;
};

const ConfigMainFieldForm = ({
  eventId,
  defaultConfigFields,
  templateFieldConfig,
  isSubmitForm,
  onSubmit,
  onRefetchData,
}: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Redux
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  // ** State
  const [defaultAttributeValue, setDefaultAttributeValue] = useState<AttributeFieldType>();

  // ** Ref
  const submitFormBtnRef = useRef<HTMLButtonElement>(null);

  // ** Yup && React Hook Form
  const generateFieldValidation = (value: any) => {
    switch (typeof value) {
      case "string":
        return yup.string().notRequired();
      case "boolean":
        return yup.boolean().notRequired();
      case "number":
        return yup.string().matches(numberRegex, translation("error.invalidNumber")).notRequired();
      default:
        return yup.mixed().notRequired();
    }
  };

  const generateValidationSchema = (eventFieldConfig: any) => {
    const schema = yup.object().shape({
      configItems: yup.array().of(
        yup.object().shape({
          field: yup.string().required(translation("error.requiredFieldName")),
          desc: yup.string().required(translation("error.requiredDescription")),
          order: yup.number().notRequired(),
          is_main: yup.boolean().notRequired(),
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
      isDuplicate: yup.boolean().test("is-duplicate", function (value, { parent, resolve, schema }) {
        const configItems: any = parent.configItems;

        const indexDuplicated = handleCheckDuplicateEventConfigFields(configItems);
        if (indexDuplicated.length > 1) {
          const error1 = new yup.ValidationError(
            translation("error.duplicateFieldName"),
            "",
            `configItems[${indexDuplicated[0]}].field`,
          );
          const error2 = new yup.ValidationError(
            translation("error.duplicateFieldName"),
            "",
            `configItems[${indexDuplicated[1]}].field`,
          );

          return new yup.ValidationError([error1, error2]);
        }
        return true;
      }),
    });

    return schema;
  };

  const ConfigItemSchema = defaultConfigFields.length > 0 ? generateValidationSchema(defaultConfigFields[0]) : null;

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormConfigItemValue>({
    mode: "onChange",
    resolver: yupResolver(ConfigItemSchema),
    defaultValues: {
      configItems: [],
    },
  });
  console.log("errors: ", errors);

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
      configItemsRemove();
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

  const handleSubmitConfigMainField = (values: FormConfigItemValue) => {
    onSubmit(values.configItems);
  };

  const handleRemoveFieldConfig = async (index: number) => {
    try {
      const body: IDeleteEventConfigFields = {
        event_id: eventId,
        data: {
          custom_fields: [configItemsFields[index].field],
        },
      };
      const response = await eventApi.deleteEventConfigFields(body);
      if (response.status === "success") {
        configItemsRemove(index);
        toastSuccess(translation("successApi.DELETE_EVENT_CONFIG_FIELD_SUCCESS"));
        onRefetchData();
      }
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.DELETE_EVENT_CONFIG_FIELD_FAILED"));
      }
    }
  };

  const handleCheckDuplicateEventConfigFields = (array: EventConfigFieldType[]) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      for (let j = i + 1; j < array.length; j++) {
        const tempEl = array[j];
        if (element.field && tempEl.field && element.field === tempEl.field) {
          return [i, j];
        }
      }
    }
    return [-1];
  };

  useEffect(() => {
    handleSetDefaultValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfigFields.length]);

  useEffect(() => {
    handleGetDefaultAttributeValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateFieldConfig]);

  useEffect(() => {
    if (submitFormBtnRef.current) {
      if (isSubmitForm) {
        submitFormBtnRef.current.click();
      }
    }
  }, [isSubmitForm]);

  return (
    <div className="grid gap-y-4">
      <div className="hidden grid-cols-12 md:grid gap-x-3 xl:flex">
        <div className={clsx("col-span-1 lg:col-span-1 xl:w-20", !isSideBarCollapse && "md:col-span-2")}>
          {translation("label.ordinalNumber")}
        </div>
        <div className={clsx("col-span-4 lg:col-span-4 xl:flex-1", !isSideBarCollapse && "md:col-span-5")}>
          {translation("label.fieldName")}
        </div>
        <div className={clsx("col-span-4 lg:col-span-4 xl:flex-[2]", !isSideBarCollapse && "md:col-span-5")}>
          {translation("label.description")}
        </div>
        <div className="hidden xl:block xl:w-[108px]"></div>
      </div>

      <form onSubmit={handleSubmit(handleSubmitConfigMainField)}>
        {configItemsFields.map((field, index, array) => (
          <div
            key={field.id}
            className={clsx(index < array.length - 1 && "pb-4 mb-4 border-b-[1px] border-b-gray-300")}
          >
            <ConfigItemForm
              isMainField={field.is_main}
              templateConfigFields={templateFieldConfig}
              control={control}
              errors={errors}
              index={index}
              onRemove={handleRemoveFieldConfig}
            />
          </div>
        ))}

        <button ref={submitFormBtnRef} className="hidden" type="submit">
          submit
        </button>
      </form>

      <StyledSecondaryButton variant="outlined" onClick={handleAppendForm}>
        <span className="font-semibold">{translation("action.appendField")}</span>
      </StyledSecondaryButton>
    </div>
  );
};

export default ConfigMainFieldForm;
