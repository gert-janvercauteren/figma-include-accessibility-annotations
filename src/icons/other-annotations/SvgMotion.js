import * as React from 'react';

function SvgMotion() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24.187"
        cy="15.5"
        r="6.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="4.5"
        y1="22"
        x2="23.5"
        y2="22"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="2.5"
        y1="15.5"
        x2="9.5"
        y2="15.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="13.5"
        y1="15.5"
        x2="17.5"
        y2="15.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12.5"
        y1="9"
        x2="23.5"
        y2="9"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="6.5"
        y1="9"
        x2="8.5"
        y2="9"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default React.memo(SvgMotion);
