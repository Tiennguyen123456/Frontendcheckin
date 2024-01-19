"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import { Collapse, IconButton } from "@mui/material";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Control, Controller, FieldErrors, UseFieldArrayRemove } from "react-hook-form";
import { DeviceType, InputType } from "../../../../constants/enum";
import { convertOptions } from "../../../../helpers/funcs";
import { EventConfigTemplateType } from "../../../../models/Event";
import { selectCommon } from "../../../../redux/common/slice";
import { useAppSelector } from "../../../../redux/root/hooks";
import { themeColors } from "../../../../theme/theme";
import CustomCheckbox from "../../Checkbox";
import CustomColorPicker from "../../Colorpicker";
import SelectField from "../../Select";
import Input from "../../TextField";
import ConfigMainFieldForm, { FormConfigItemValue } from "../ConfigMainField/ConfigMainField";
import ConfigEventFieldForm from "./ConfigEventField";
import ConfigEventForm from "./ConfigEventField";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  temp: any;
};

const ConfigEventItemForm = ({ temp }: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [showConfig, setShowConfig] = useState(false);

  // ** Redux
  const { deviceType, isSideBarCollapse } = useAppSelector(selectCommon);

  // ** Functions
  // const renderConfigFields = () => {
  //   if (!templateConfigFields) {
  //     return [];
  //   }

  //   const desktop = Object.keys(templateConfigFields?.attributes?.desktop).map((key) => (
  //     <div key={`desktop.${key}`} className="md:col-span-2">
  //       <Controller
  //         control={control}
  //         name={`configItems.${index}.attributes.desktop.${key}`}
  //         render={({ field }) => {
  //           const inputType = templateConfigFields?.attributes?.desktop?.[key]?.type;

  //           if (inputType === InputType.Select) {
  //             const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

  //             return (
  //               <SelectField
  //                 value={String(field.value)}
  //                 variant={"outlined"}
  //                 options={convertOptions(options)}
  //                 error={Boolean(errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message)}
  //                 helperText={errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           } else if (inputType === InputType.Checkbox) {
  //             return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
  //           } else if (inputType === InputType.Color) {
  //             return (
  //               <CustomColorPicker
  //                 format="hex"
  //                 value={String(field.value)}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           }

  //           return (
  //             <Input
  //               value={String(field.value)}
  //               error={Boolean(errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message)}
  //               helperText={errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message}
  //               onChange={(value) => field.onChange(value)}
  //             />
  //           );
  //         }}
  //       />
  //     </div>
  //   ));

  //   const tablet = Object.keys(templateConfigFields?.attributes?.tablet).map((key) => (
  //     <div key={`tablet.${key}`} className="md:col-span-2">
  //       <Controller
  //         control={control}
  //         name={`configItems.${index}.attributes.tablet.${key}`}
  //         render={({ field }) => {
  //           const inputType = templateConfigFields?.attributes?.tablet?.[key]?.type;

  //           if (inputType === InputType.Select) {
  //             const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

  //             return (
  //               <SelectField
  //                 value={String(field.value)}
  //                 variant={"outlined"}
  //                 options={convertOptions(options)}
  //                 error={Boolean(errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message)}
  //                 helperText={errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           } else if (inputType === InputType.Checkbox) {
  //             return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
  //           } else if (inputType === InputType.Color) {
  //             return (
  //               <CustomColorPicker
  //                 format="hex"
  //                 value={String(field.value)}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           }

  //           return (
  //             <Input
  //               value={String(field.value)}
  //               error={Boolean(errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message)}
  //               helperText={errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message}
  //               onChange={(value) => field.onChange(value)}
  //             />
  //           );
  //         }}
  //       />
  //     </div>
  //   ));

  //   const mobile = Object.keys(templateConfigFields?.attributes?.mobile).map((key) => (
  //     <div key={`mobile.${key}`} className="md:col-span-2">
  //       <Controller
  //         control={control}
  //         name={`configItems.${index}.attributes.mobile.${key}`}
  //         render={({ field }) => {
  //           const inputType = templateConfigFields?.attributes?.mobile?.[key]?.type;

  //           if (inputType === InputType.Select) {
  //             const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

  //             return (
  //               <SelectField
  //                 value={String(field.value)}
  //                 variant={"outlined"}
  //                 options={convertOptions(options)}
  //                 error={Boolean(errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message)}
  //                 helperText={errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           } else if (inputType === InputType.Checkbox) {
  //             return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
  //           } else if (inputType === InputType.Color) {
  //             return (
  //               <CustomColorPicker
  //                 format="hex"
  //                 value={String(field.value)}
  //                 onChange={(value) => field.onChange(value)}
  //               />
  //             );
  //           }

  //           return (
  //             <Input
  //               value={String(field.value)}
  //               error={Boolean(errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message)}
  //               helperText={errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message}
  //               onChange={(value) => field.onChange(value)}
  //             />
  //           );
  //         }}
  //       />
  //     </div>
  //   ));

  //   const configFieldsEls: any = [];

  //   for (let i = 0; i < desktop.length; i++) {
  //     const desktopFieldEl = desktop[i];
  //     const tabletFieldEl = tablet[i];
  //     const mobileFieldEl = mobile[i];

  //     const keys = Object.keys(templateConfigFields?.attributes?.desktop);

  //     configFieldsEls.push(
  //       <div key={`configFields${i}`} className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7 mb-3 last:mb-0">
  //         <div>{keys[i]}</div>
  //         {desktopFieldEl}
  //         {tabletFieldEl}
  //         {mobileFieldEl}
  //       </div>,
  //     );
  //   }
  //   return configFieldsEls;
  // };

  return (
    <div>
      <div className="grid grid-cols-12 gap-3 border-[1px] border-gray-400 rounded-md mb-2">
        <div
          className={clsx(
            "col-span-10 md:col-span-10 text-center self-center",
            deviceType === DeviceType.Tablet && !isSideBarCollapse && "md:col-span-2",
          )}
        >
          <div className="flex justify-center items-center md:ml-24">
            <div>
              <SettingsIcon className="mr-2" />
              {temp.title}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div
          className={clsx(
            "md:col-span-2 md:flex md:items-center md:h-12",
            deviceType === DeviceType.Tablet && !isSideBarCollapse ? "md:justify-start" : "md:justify-end",
            deviceType === DeviceType.Desktop && isSideBarCollapse && "lg:col-span-2",
          )}
        >
          <div className={clsx("transition-all duration-300 ease-in-out", showConfig && "rotate-180")}>
            <IconButton onClick={() => setShowConfig(!showConfig)}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse in={showConfig}>
        <div className="mt-5">
          {temp?.subConfigList.map((item: any, index: any) => (
            <ConfigEventFieldForm labelField={item.labelField} inputType={item.inputType} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default ConfigEventItemForm;
