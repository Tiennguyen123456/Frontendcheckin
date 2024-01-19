import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AttributeFieldType, EventConfigFieldType } from "../../../../models/Event";
import { selectCommon } from "../../../../redux/common/slice";
import { useAppSelector } from "../../../../redux/root/hooks";
import CustomCheckbox from "../../Checkbox";
import Input from "../../TextField";

const { yupResolver } = require("@hookform/resolvers/yup");

export type FormConfigItemValue = {
  configItems: EventConfigFieldType[];
};

type Props = {
  labelField: string;
  inputType: string;
};

const ConfigEventFieldForm = ({ labelField, inputType }: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Redux
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  // ** State
  const [defaultAttributeValue, setDefaultAttributeValue] = useState<AttributeFieldType>();

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
    // resolver: yupResolver(),
    defaultValues: {
      configItems: [],
    },
  });

  return (
    <div className="hidden md:grid gap-x-3 mb-2">
      <div className="grid grid-cols-12">
        <div className={clsx("col-span-6 lg:col-span-6 grid gap-2 mt-2", !isSideBarCollapse && "md:col-span-6")}>
          <span>{labelField}</span>
        </div>
        <div className={clsx("col-span-4 lg:col-span-4 grid gap-2", !isSideBarCollapse && "md:col-span-4")}>
          {inputType === "checkbox" && <CustomCheckbox label={""} checked={true} onChange={(value) => {}} />}
          {inputType === "text" && (
            <Input
              sx={{
                "& input": {
                  minWidth: "unset",
                },
              }}
              value={"0"}
              fullWidth
              onChange={() => {}}
            />
          )}
        </div>
        <div className={clsx("col-span-2 lg:col-span-2 grid gap-2 mt-2 ml-20", !isSideBarCollapse && "md:col-span-2")}>
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default ConfigEventFieldForm;
