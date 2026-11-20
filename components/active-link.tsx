"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function ActiveLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname() ?? "/";
  const exact = !href.includes("#") && pathname === href;
  const active = exact || (!href.includes("#") && href !== "/" && pathname.startsWith(`${href}/`));
  return <Link {...props} href={href} aria-current={exact ? "page" : active ? "location" : undefined} data-active={active || undefined} />;
}
