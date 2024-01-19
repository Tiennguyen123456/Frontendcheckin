"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { generateBreadcrumbs } from "../../../helpers/funcs";
import { IRouterBreadcrumbs } from "../../../models/Route";
import Link from "next/link";
import clsx from "clsx";

const Breadcrumbs = () => {
  // ** Router
  const pathname = usePathname();

  // ** State
  const [breadcrumbs, setBreadcrumbs] = useState<IRouterBreadcrumbs[]>([]);

  useEffect(() => {
    setBreadcrumbs(generateBreadcrumbs());
  }, [pathname]);

  return (
    <div className="flex gap-x-2">
      {breadcrumbs.map((item, index) => (
        <Link
          key={item.slug}
          href={item.slug}
          className={clsx(index === breadcrumbs.length - 1 ? "text-black" : "text-gray-400")}
        >
          {`/ ${item.name}`}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
