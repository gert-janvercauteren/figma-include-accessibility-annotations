import * as React from 'react';

function SvgInteraction() {
  return (
    <svg
      width="36"
      height="25"
      viewBox="0 0 36 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5945"
        cy="16.8281"
        r="3.49444"
        stroke="black"
        strokeLinecap="round"
      />
      <circle
        cx="15.5946"
        cy="16.4165"
        r="7.60556"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="2 4 6 4"
      />
      <circle cx="3.87782" cy="2.64369" r="1.55556" stroke="black" />
      <circle cx="1.40179" cy="20.528" r="0.733333" stroke="black" />
      <circle cx="22.5834" cy="5.72258" r="0.938889" stroke="black" />
      <circle cx="33.6034" cy="10.455" r="0.938889" stroke="black" />
      <circle cx="30.3146" cy="22.3785" r="1.35" stroke="black" />
      <path
        d="M5.93335 5.11157L12.1 12.5842"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
      <path
        d="M21.1445 7.98853L20.1356 9.42798"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
      <path
        d="M30.8501 11.4219L24.0223 13.7459"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
      <path
        d="M26.9478 21.135L20.6399 18.678"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
      <path
        d="M7.57788 18.6776L3.87788 19.9109"
        stroke="black"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
    </svg>
  );
}

export default React.memo(SvgInteraction);
