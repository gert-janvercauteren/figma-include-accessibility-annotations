import * as React from 'react';

function SvgRole() {
  return (
    <svg
      width="31"
      height="23"
      viewBox="0 0 31 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6155 5.84613C24.2212 6.45189 27.9063 10.1369 29.673 11.9037L23.6155 17.9613"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.05762 17.9615C6.45186 17.3558 2.76684 13.6708 1.00005 11.904L7.05762 5.84642"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.6924 22L19.577 1" stroke="black" strokeLinecap="round" />
    </svg>
  );
}

export default React.memo(SvgRole);