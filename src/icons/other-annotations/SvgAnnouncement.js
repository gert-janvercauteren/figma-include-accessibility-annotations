import * as React from 'react';

function SvgAnnouncement() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1169_204542)">
        <path
          d="M23.248 8.23381L25.3905 5.33385"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.9777 11.7976L29.9545 10.1212"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.095 15.7803L29.9809 16.344"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2788 7.46484L18.639 20.0231"
          stroke="black"
          strokeLinecap="round"
        />
        <path
          d="M1.55088 15.7963C1.26538 14.7293 1.89894 13.6328 2.96597 13.3473L7.79606 12.0549L9.86385 19.7831L5.03376 21.0755C3.96672 21.361 2.87028 20.7274 2.58477 19.6604L1.55088 15.7963Z"
          stroke="black"
        />
        <path
          d="M21.7728 17.8645L19.0717 7.76931C18.7188 6.45058 17.1777 5.86508 16.0382 6.61684L7.7961 12.0545L9.86388 19.7827L19.7202 20.3778C21.0828 20.4601 22.1256 19.1832 21.7728 17.8645Z"
          stroke="black"
          strokeLinejoin="round"
        />
        <path
          d="M5.03369 21.0752L8.89777 20.0413L10.1901 24.8714C10.4756 25.9384 9.84207 27.0349 8.77504 27.3204V27.3204C7.70801 27.6059 6.61156 26.9723 6.32606 25.9053L5.03369 21.0752Z"
          stroke="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1169_204542">
          <rect width="32" height="32" rx="4" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default React.memo(SvgAnnouncement);
