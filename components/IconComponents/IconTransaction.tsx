const IconTransaction = ({ active }: { active: boolean }) => (
  <svg width={19} height={18} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.46875 16.1563L4.46875 1.53125M4.46875 1.53125L1.46875 4.53125M4.46875 1.53125L7.46875 4.53125"
      stroke={active ? '#00CC5B' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1562 1.53125V16.1562M14.1562 16.1562L11.1562 13.1562M14.1562 16.1562L17.1562 13.1562"
      stroke={active ? '#00CC5B' : '#0A0A0A'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconTransaction;
