import React, { ReactNode } from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useTranslations } from "next-intl";

type Props = {
  icon: ReactNode;
  title: string;
};

const Callout = ({ icon, title }: Props) => {
  // ** I18n
  const translation = useTranslations();

  return (
    <div className="flex flex-1 flex-col gap-y-5 py-6 bg-gray-200 rounded-lg items-center">
      <div className="bg-black p-3 rounded-full w-fit text-white">{icon}</div>
      <div>
        <p className="font-semibold text-center">{title}</p>
        <p className="text-gray-400 text-center">{translation("callOut.subtitle")}</p>
      </div>

      <button className="bg-black w-[200px] py-2">
        <SettingsRoundedIcon fontSize="small" className="text-white" />
      </button>
    </div>
  );
};

export default Callout;
