import * as React from 'react';

function SvgInteraction() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1169_204553)">
        <ellipse
          cx="14.1547"
          cy="18.9008"
          rx="3.20647"
          ry="3.20647"
          stroke="black"
          strokeLinecap="round"
        />
        <circle
          cx="14.1548"
          cy="18.5237"
          r="6.97878"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="2 4 6 4"
        />
        <circle cx="3.40374" cy="5.88616" r="1.38616" stroke="black" />
        <circle cx="1.13169" cy="22.2958" r="0.631694" stroke="black" />
        <circle cx="20.5679" cy="8.71094" r="0.82031" stroke="black" />
        <circle cx="30.6797" cy="13.0537" r="0.82031" stroke="black" />
        <circle cx="27.6619" cy="23.9944" r="1.19754" stroke="black" />
        <path
          d="M5.28979 8.15039L10.9483 15.0072"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="0.1 2"
        />
        <path
          d="M19.2476 10.79L18.3218 12.1109"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="0.1 2"
        />
        <path
          d="M28.1531 13.9414L21.888 16.0739"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="0.1 2"
        />
        <path
          d="M24.5725 22.8535L18.7845 20.599"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="0.1 2"
        />
        <path
          d="M6.79883 20.5986L3.40375 21.7303"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="0.1 2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1169_204553">
          <rect width="32" height="32" rx="4" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default React.memo(SvgInteraction);
