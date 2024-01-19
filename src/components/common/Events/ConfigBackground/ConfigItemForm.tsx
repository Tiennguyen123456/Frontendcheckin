"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DeviceType } from "../../../../constants/enum";
import { selectCommon } from "../../../../redux/common/slice";
import { useAppSelector } from "../../../../redux/root/hooks";
import { FileInput } from "../../FileUpload";
import ImageUpload from "../../FileUpload/ImageUpload";

const ConfigBackgroundItemForm = () => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [showConfig, setShowConfig] = useState(false);

  // ** Redux
  const { deviceType, isSideBarCollapse } = useAppSelector(selectCommon);

  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-2">
        <div
          className={clsx(
            "col-span-10 md:col-span-10 ",
            deviceType === DeviceType.Tablet && !isSideBarCollapse && "md:col-span-2",
          )}
        >
          <FileInput />
        </div>
      </div>
    </div>
  );
};

export default ConfigBackgroundItemForm;
