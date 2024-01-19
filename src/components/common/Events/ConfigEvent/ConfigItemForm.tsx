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
            <ConfigEventFieldForm key={index} labelField={item.labelField} inputType={item.inputType} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default ConfigEventItemForm;
