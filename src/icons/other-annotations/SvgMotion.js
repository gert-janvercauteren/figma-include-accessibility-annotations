import * as React from 'react';

function SvgMotion() {
  return (
    <svg
      width="30"
      height="15"
      viewBox="0 0 30 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.187"
        cy="7.49945"
        r="6.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="2.5"
        y1="13.9995"
        x2="21.5"
        y2="13.9995"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="0.5"
        y1="7.49945"
        x2="7.5"
        y2="7.49945"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="11.5"
        y1="7.49945"
        x2="15.5"
        y2="7.49945"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="10.5"
        y1="0.999451"
        x2="21.5"
        y2="0.99945"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="4.5"
        y1="0.999451"
        x2="6.5"
        y2="0.999451"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default React.memo(SvgMotion);
