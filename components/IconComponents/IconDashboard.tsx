const IconDashboard = ({ active }: { active: boolean }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3047_8269)">
      <path
        d="M12 12V3"
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7906 7.5L4.20935 16.5"
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.14997 13.65C3.04765 13.106 2.99742 12.5535 2.99997 12C2.99878 10.1387 3.57533 8.32287 4.65004 6.80317C5.72475 5.28346 7.24464 4.13477 8.99997 3.51562V10.2656L3.14997 13.65Z"
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3C13.577 3.00018 15.1263 3.41474 16.4927 4.20215C17.8591 4.98957 18.9946 6.12219 19.7854 7.48658C20.5763 8.85096 20.9948 10.3992 20.9989 11.9762C21.0031 13.5533 20.5928 15.1037 19.8092 16.4722C19.0255 17.8408 17.896 18.9794 16.5338 19.774C15.1716 20.5686 13.6245 20.9914 12.0475 20.9999C10.4705 21.0084 8.91897 20.6024 7.54827 19.8225C6.17757 19.0426 5.03586 17.9163 4.23749 16.5563"
        stroke={active ? '#00CC5B' : '#0A0A0A'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3047_8269">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default IconDashboard;
