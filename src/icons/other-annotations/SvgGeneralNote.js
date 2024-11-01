import * as React from 'react';

function SvgGeneralNote() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.5" y="5.5" width="18" height="23" rx="1.5" stroke="black" />
      <path d="M10 11L21 11" stroke="black" strokeLinecap="round" />
      <path d="M10 14L21 14" stroke="black" strokeLinecap="round" />
      <path d="M10 17L21 17" stroke="black" strokeLinecap="round" />
      <path d="M15.5 4L15.5 7" stroke="black" strokeLinecap="round" />
      <path d="M12 4L12 7" stroke="black" strokeLinecap="round" />
      <path d="M19 4L19 7" stroke="black" strokeLinecap="round" />
    </svg>
  );
}

export default React.memo(SvgGeneralNote);
