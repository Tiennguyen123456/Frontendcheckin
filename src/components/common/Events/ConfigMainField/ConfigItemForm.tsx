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
import { FormConfigItemValue } from "./ConfigMainField";

type Props = {
  control: Control<FormConfigItemValue, any>;
  index: number;
  errors: FieldErrors<FormConfigItemValue>;
  templateConfigFields?: EventConfigTemplateType;
  onRemove: UseFieldArrayRemove;
  showRemoveButton?: boolean;
  isMainField?: boolean;
};

const ConfigItemForm = ({
  control,
  index,
  errors,
  templateConfigFields,
  showRemoveButton = true,
  isMainField = false,
  onRemove,
}: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [showConfig, setShowConfig] = useState(false);

  // ** Redux
  const { deviceType, isSideBarCollapse } = useAppSelector(selectCommon);

  // ** Functions
  const renderConfigFields = () => {
    if (!templateConfigFields) {
      return [];
    }

    const desktop = Object.keys(templateConfigFields?.attributes?.desktop).map((key) => (
      <div key={`desktop.${key}`} className="md:col-span-2">
        <Controller
          control={control}
          name={`configItems.${index}.attributes.desktop.${key}`}
          render={({ field }) => {
            const inputType = templateConfigFields?.attributes?.desktop?.[key]?.type;

            if (inputType === InputType.Select) {
              const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

              return (
                <SelectField
                  value={String(field.value)}
                  variant={"outlined"}
                  options={convertOptions(options)}
                  error={Boolean(errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message)}
                  helperText={errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message}
                  onChange={(value) => field.onChange(value)}
                />
              );
            } else if (inputType === InputType.Checkbox) {
              return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
            } else if (inputType === InputType.Color) {
              return (
                <CustomColorPicker
                  format="hex"
                  value={String(field.value)}
                  onChange={(value) => field.onChange(value)}
                />
              );
            }

            return (
              <Input
                value={String(field.value)}
                error={Boolean(errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message)}
                helperText={errors?.configItems?.[index]?.attributes?.desktop?.[key]?.message}
                onChange={(value) => field.onChange(value)}
              />
            );
          }}
        />
      </div>
    ));

    const tablet = Object.keys(templateConfigFields?.attributes?.tablet).map((key) => (
      <div key={`tablet.${key}`} className="md:col-span-2">
        <Controller
          control={control}
          name={`configItems.${index}.attributes.tablet.${key}`}
          render={({ field }) => {
            const inputType = templateConfigFields?.attributes?.tablet?.[key]?.type;

            if (inputType === InputType.Select) {
              const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

              return (
                <SelectField
                  value={String(field.value)}
                  variant={"outlined"}
                  options={convertOptions(options)}
                  error={Boolean(errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message)}
                  helperText={errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message}
                  onChange={(value) => field.onChange(value)}
                />
              );
            } else if (inputType === InputType.Checkbox) {
              return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
            } else if (inputType === InputType.Color) {
              return (
                <CustomColorPicker
                  format="hex"
                  value={String(field.value)}
                  onChange={(value) => field.onChange(value)}
                />
              );
            }

            return (
              <Input
                value={String(field.value)}
                error={Boolean(errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message)}
                helperText={errors?.configItems?.[index]?.attributes?.tablet?.[key]?.message}
                onChange={(value) => field.onChange(value)}
              />
            );
          }}
        />
      </div>
    ));

    const mobile = Object.keys(templateConfigFields?.attributes?.mobile).map((key) => (
      <div key={`mobile.${key}`} className="md:col-span-2">
        <Controller
          control={control}
          name={`configItems.${index}.attributes.mobile.${key}`}
          render={({ field }) => {
            const inputType = templateConfigFields?.attributes?.mobile?.[key]?.type;

            if (inputType === InputType.Select) {
              const options = templateConfigFields?.attributes?.desktop?.[key]?.options;

              return (
                <SelectField
                  value={String(field.value)}
                  variant={"outlined"}
                  options={convertOptions(options)}
                  error={Boolean(errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message)}
                  helperText={errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message}
                  onChange={(value) => field.onChange(value)}
                />
              );
            } else if (inputType === InputType.Checkbox) {
              return <CustomCheckbox checked={Boolean(field.value)} onChange={(value) => field.onChange(value)} />;
            } else if (inputType === InputType.Color) {
              return (
                <CustomColorPicker
                  format="hex"
                  value={String(field.value)}
                  onChange={(value) => field.onChange(value)}
                />
              );
            }

            return (
              <Input
                value={String(field.value)}
                error={Boolean(errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message)}
                helperText={errors?.configItems?.[index]?.attributes?.mobile?.[key]?.message}
                onChange={(value) => field.onChange(value)}
              />
            );
          }}
        />
      </div>
    ));

    const configFieldsEls: any = [];

    for (let i = 0; i < desktop.length; i++) {
      const desktopFieldEl = desktop[i];
      const tabletFieldEl = tablet[i];
      const mobileFieldEl = mobile[i];

      const keys = Object.keys(templateConfigFields?.attributes?.desktop);

      configFieldsEls.push(
        <div key={`configFields${i}`} className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7 mb-3 last:mb-0">
          <div>{keys[i]}</div>
          {desktopFieldEl}
          {tabletFieldEl}
          {mobileFieldEl}
        </div>,
      );
    }
    return configFieldsEls;
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        {deviceType === DeviceType.Mobile && (
          <div className="self-center col-span-2">
            <span>{translation("label.ordinalNumber")}</span>
          </div>
        )}

        <div
          className={clsx(
            "col-span-2 md:col-span-1",
            deviceType === DeviceType.Tablet && !isSideBarCollapse && "md:col-span-2",
          )}
        >
          <Input
            sx={{
              "& input": {
                minWidth: "unset",
              },
            }}
            value={(index + 1).toString()}
            readOnly
          />
        </div>

        {/* Action buttons */}
        <div className="self-center col-span-4 justify-self-end md:hidden">
          <IconButton sx={{ color: themeColors.colors.blue219 }}>
            <SaveIcon />
          </IconButton>
        </div>

        <div className="self-center col-span-2 md:hidden">
          <IconButton sx={{ color: themeColors.colors.redD32 }} aria-label="delete" onClick={() => onRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </div>

        <div
          className={clsx(
            "self-center col-span-2 transition-all duration-300 ease-in-out md:hidden",
            showConfig && "rotate-180",
          )}
        >
          <IconButton onClick={() => setShowConfig(!showConfig)}>
            <ExpandMoreIcon />
          </IconButton>
        </div>

        <div
          className={clsx(
            "col-span-6 md:col-span-4",
            deviceType === DeviceType.Tablet && !isSideBarCollapse && "md:col-span-5",
          )}
        >
          <Controller
            control={control}
            name={`configItems.${index}.field`}
            render={({ field }) => (
              <Input
                sx={{
                  "& input": {
                    minWidth: "unset",
                  },
                }}
                value={field.value}
                label={deviceType === DeviceType.Mobile ? translation("label.fieldName") : ""}
                placeholder={translation("placeholder.fieldName")}
                variant={"outlined"}
                disabled={isMainField}
                error={Boolean(errors?.configItems?.[index]?.field?.message)}
                helperText={errors?.configItems?.[index]?.field?.message}
                onChange={(value) => field.onChange(value)}
                onBlur={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        <div
          className={clsx(
            "col-span-6 md:col-span-4",
            deviceType === DeviceType.Tablet && !isSideBarCollapse && "md:col-span-5",
            deviceType === DeviceType.Desktop && isSideBarCollapse && "lg:col-span-5",
          )}
        >
          <Controller
            control={control}
            name={`configItems.${index}.desc`}
            render={({ field }) => (
              <Input
                sx={{
                  "& input": {
                    minWidth: "unset",
                  },
                }}
                value={field.value}
                label={deviceType === DeviceType.Mobile ? translation("label.description") : ""}
                placeholder={translation("placeholder.description")}
                variant={"outlined"}
                error={Boolean(errors?.configItems?.[index]?.desc?.message)}
                helperText={errors?.configItems?.[index]?.desc?.message}
                onChange={(value) => field.onChange(value)}
                onBlur={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        {/* Action Button */}
        <div
          className={clsx(
            "hidden md:col-span-3 md:flex md:items-center md:h-12",
            deviceType === DeviceType.Tablet && !isSideBarCollapse ? "md:justify-start" : "md:justify-end",
            deviceType === DeviceType.Desktop && isSideBarCollapse && "lg:col-span-2",
          )}
        >
          <IconButton sx={{ color: themeColors.colors.blue219 }}>
            <SaveIcon />
          </IconButton>

          <IconButton sx={{ color: themeColors.colors.redD32 }} aria-label="delete" onClick={() => onRemove(index)}>
            <DeleteIcon />
          </IconButton>

          <div className={clsx("transition-all duration-300 ease-in-out", showConfig && "rotate-180")}>
            <IconButton onClick={() => setShowConfig(!showConfig)}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse in={showConfig}>
        <div className="mt-5">
          <h4 className="mb-5 font-semibold text-center uppercase">{translation("label.configField")}</h4>

          <div>
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7 mb-3">
              <div className="col-start-2 font-semibold md:col-span-2 md:col-start-2">{translation("label.pc")}</div>
              <div className="font-semibold md:col-span-2">{translation("label.table")}</div>
              <div className="font-semibold md:col-span-2">{translation("label.mobile")}</div>
            </div>

            {renderConfigFields()}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ConfigItemForm;
