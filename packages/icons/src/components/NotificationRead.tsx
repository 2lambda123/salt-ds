// WARNING: This file was generated by a script. Do not modify it manually
import { forwardRef } from "react";

import { Icon, IconProps } from "../icon";

export type NotificationReadIconProps = IconProps;

export const NotificationReadIcon = forwardRef<
  SVGSVGElement,
  NotificationReadIconProps
>(function NotificationReadIcon(props: NotificationReadIconProps, ref) {
  return (
    <Icon
      data-testid="NotificationReadIcon"
      aria-label="notification read"
      viewBox="0 0 12 12"
      ref={ref}
      {...props}
    >
      <path d="M9.51 1.368a2.802 2.802 0 0 0-.393-.477 3.032 3.032 0 0 0-.949-.657A2.962 2.962 0 0 0 6.996 0H5.004c-.414 0-.805.078-1.172.234a3.179 3.179 0 0 0-.96.657 2.971 2.971 0 0 0-.634.949c-.156.36-.234.746-.234 1.16v3c-.102.57-.238 1.023-.41 1.36-.164.335-.364.55-.598.644H0V9h12v-.996h-.996c-.234-.094-.438-.309-.61-.645-.164-.336-.296-.789-.398-1.359v-.875l-.988.989.004.062c.07.375.152.715.246 1.02.094.304.21.574.351.808H2.391c.14-.234.257-.504.351-.809.094-.304.176-.644.246-1.02L3 6V3c0-.547.195-1.016.586-1.406.39-.39.863-.586 1.418-.586h1.992a1.93 1.93 0 0 1 1.418.586c.154.154.278.32.372.5l.725-.726ZM4.934 11.59c.296.273.652.41 1.066.41a1.48 1.48 0 0 0 1.055-.41c.297-.266.445-.59.445-.973v-.61h-3v.61c0 .383.145.707.434.973Z" />
      <path
        fillRule="evenodd"
        d="M7.121 5.172 11.293 1l.707.707-4.879 4.879L5 4.464l.707-.707 1.414 1.415Z"
        clipRule="evenodd"
      />
    </Icon>
  );
});