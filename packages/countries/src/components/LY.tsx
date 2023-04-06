// WARNING: This file was generated by a script. Do not modify it manually
import { forwardRef, useState } from "react";

import { CountrySymbol, CountrySymbolProps } from "../country-symbol";

export type LYProps = CountrySymbolProps;

const LY = forwardRef<SVGSVGElement, LYProps>(function LY(props: LYProps, ref) {
  const [uid] = useState(() => props.id || Math.random().toString());

  return (
    <CountrySymbol
      data-testid="LY"
      aria-label="Libya"
      viewBox="0 0 72 72"
      ref={ref}
      {...props}
    >
      <mask
        id={`${uid}-LY-a`}
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle cx="36" cy="36" r="36" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#${uid}-LY-a)`}>
        <path fill="#009B77" d="M0 72V54h72v18z" />
        <path fill="#31373D" d="M0 54V18h72v36z" />
        <path fill="#DD2033" d="M0 18V0h72v18z" />
        <path
          fill="#F5F7F8"
          d="M30.666 26c.82 0 1.617.099 2.379.285A11.946 11.946 0 0 0 26 24c-6.628 0-12 5.373-12 12s5.372 12 12 12a11.94 11.94 0 0 0 7.045-2.285c-.762.186-1.559.285-2.379.285-5.522 0-10-4.477-10-10s4.478-10 10-10Zm11.007 6.885 1.02-6.556 4.162 5.167 6.311-.855-3.321 5.608 2.88 6.027-6.344-2.182-4.402 5.062-.52-6.66-5.68-3.196 5.894-2.415Z"
        />
      </g>
    </CountrySymbol>
  );
});

export default LY;