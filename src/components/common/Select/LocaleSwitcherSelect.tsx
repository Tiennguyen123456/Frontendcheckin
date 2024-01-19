"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, GlobeAsiaAustraliaIcon } from "@heroicons/react/20/solid";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useState, useTransition } from "react";
import { locales } from "../../../i18n-configurations/config";
import { usePathname, useRouter } from "../../../i18n-configurations/i18n-navigation";

export default function LocaleSwitcherSelect() {
  // ** I18n
  const router = useRouter();
  const pathname = usePathname();
  const translation = useTranslations("localeSwitcher");
  const locale = useLocale();

  // ** State
  const [isPending, startTransition] = useTransition();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);

  function onSelectChange(value: string) {
    localStorage.setItem("locale", value);
    setSelectedLanguage(value);

    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }

  return (
    <Listbox value={selectedLanguage} onChange={onSelectChange} disabled={isPending}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-fit cursor-default rounded-lg border-[1px] border-slate-100 bg-white py-2 px-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <GlobeAsiaAustraliaIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
          <span className="block truncate">{translation(selectedLanguage)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {locales.map((locale) => (
              <Listbox.Option
                key={locale}
                className={({ active, selected }) =>
                  `relative cursor-default select-none py-2 px-4 ${(selected || active) && "bg-slate-100"} `
                }
                value={locale}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {translation(locale)}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
