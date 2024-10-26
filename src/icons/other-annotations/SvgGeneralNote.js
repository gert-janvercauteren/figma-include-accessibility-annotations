import * as React from 'react';

function SvgGeneralNote() {
  return (
    <svg
      width="19"
      height="26"
      viewBox="0 0 19 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="2.5" width="18" height="23" rx="1.5" stroke="black" />
      <path d="M4 8L15 8" stroke="black" strokeLinecap="round" />
      <path d="M4 11L15 11" stroke="black" strokeLinecap="round" />
      <path d="M4 14L15 14" stroke="black" strokeLinecap="round" />
      <path d="M9.5 1L9.5 4" stroke="black" strokeLinecap="round" />
      <path d="M6 1L6 4" stroke="black" strokeLinecap="round" />
      <path d="M13 1L13 4" stroke="black" strokeLinecap="round" />
    </svg>
  );
}

export default React.memo(SvgGeneralNote);
