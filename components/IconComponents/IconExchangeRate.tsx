const IconExchangeRate = ({ active }: { active: boolean }) => (
  <svg width={18} height={24} viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.125 12.75V12.75C1.125 8.40076 4.65076 4.875 9 4.875H16.875M16.875 4.875L14.0956 1.5M16.875 4.875L14.0956 8.25"
      stroke={active ? '#00CC5B' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.875 11.25V11.25C16.875 15.5992 13.3492 19.125 9 19.125H1.125M1.125 19.125L3.90441 22.5M1.125 19.125L3.90441 15.75"
      stroke={active ? '#00CC5B' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconExchangeRate;
