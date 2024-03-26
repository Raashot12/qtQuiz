const IconAnalytics = ({ active }: { active: boolean }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3047_8288)">
      <rect
        x={2.25}
        y={12.75}
        width={4.5}
        height={7.5}
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={9.75}
        y={9}
        width={4.5}
        height={11.25}
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={17.25}
        y={3.75}
        width={4.5}
        height={16.5}
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3047_8288">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default IconAnalytics;
