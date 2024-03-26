import * as React from 'react';
const IconWire = ({ active }: { active: boolean }) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7L19.625 7M19.625 7L16.625 4M19.625 7L16.625 10"
      stroke={active ? '#EF2C5A' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.625 16.6875L5 16.6875M5 16.6875L8 13.6875M5 16.6875L8 19.6875"
      stroke={active ? '#EF2C5A' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconWire;
