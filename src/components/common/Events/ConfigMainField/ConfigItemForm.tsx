"use client";
import React, { useState } from "react";
import { Control, Controller, FieldErrors, UseFieldArrayRemove } from "react-hook-form";
import { FormConfigItemValue } from "./ConfigMainField";
import { useTranslations } from "next-intl";
import Input from "../../TextField";
import CustomCheckbox from "../../Checkbox";
import { Collapse, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { themeColors } from "../../../../theme/theme";
import { useAppSelector } from "../../../../redux/root/hooks";
import { selectCommon } from "../../../../redux/common/slice";
import { DeviceType } from "../../../../constants/enum";
import SelectField from "../../Select";
import { FontConfig } from "../../../../constants/variables";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import clsx from "clsx";

type Props = {
  control: Control<FormConfigItemValue, any>;
  index: number;
  errors: FieldErrors<FormConfigItemValue>;
  onRemove: UseFieldArrayRemove;
  showRemoveButton?: boolean;
};

const ConfigItemForm = ({ control, index, errors, showRemoveButton = true, onRemove }: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [showConfig, setShowConfig] = useState(false);

  // ** Redux
  const { deviceType, isSideBarCollapse } = useAppSelector(selectCommon);

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
            name={`configItems.${index}.fieldName`}
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
                error={Boolean(errors?.configItems?.[index]?.fieldName?.message)}
                helperText={errors?.configItems?.[index]?.fieldName?.message}
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
            name={`configItems.${index}.description`}
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
                error={Boolean(errors?.configItems?.[index]?.description?.message)}
                helperText={errors?.configItems?.[index]?.description?.message}
                onChange={(value) => field.onChange(value)}
                onBlur={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        {/* Action Button */}
        <div
          className={clsx(
            "hidden md:col-span-3 md:flex md:items-center md:gap-x-2 md:h-12",
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
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7">
              <div className="col-start-2 font-semibold md:col-span-2 md:col-start-2">{translation("label.pc")}</div>
              <div className="font-semibold md:col-span-2">{translation("label.table")}</div>
              <div className="font-semibold md:col-span-2">{translation("label.mobile")}</div>
            </div>
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7">
              <div>{translation("label.display")}</div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pc.display`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.display`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.display`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7">
              <div>{translation("label.bold")}</div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pc.bold`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.bold`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.bold`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7">
              <div>{translation("label.italic")}</div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pc.italic`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.italic`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.italic`}
                  render={({ field }) => (
                    <>
                      <CustomCheckbox checked={field.value} onChange={(value) => field.onChange(value)} />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid items-center grid-cols-4 gap-x-3 md:grid-cols-7">
              <div>{translation("label.font")}</div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pc.font`}
                  render={({ field }) => (
                    <SelectField
                      value={field.value}
                      variant={"outlined"}
                      options={FontConfig}
                      error={Boolean(errors?.configItems?.[index]?.config?.pc?.font?.message)}
                      helperText={errors?.configItems?.[index]?.config?.pc?.font?.message}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.font`}
                  render={({ field }) => (
                    <SelectField
                      value={field.value}
                      variant={"outlined"}
                      options={FontConfig}
                      error={Boolean(errors?.configItems?.[index]?.config?.pda?.font?.message)}
                      helperText={errors?.configItems?.[index]?.config?.pda?.font?.message}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`configItems.${index}.config.pda.font`}
                  render={({ field }) => (
                    <SelectField
                      value={field.value}
                      variant={"outlined"}
                      options={FontConfig}
                      error={Boolean(errors?.configItems?.[index]?.config?.pda?.font?.message)}
                      helperText={errors?.configItems?.[index]?.config?.pda?.font?.message}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ConfigItemForm;
