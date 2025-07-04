export default function IconArrowDownUp({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={'icon icon-tabler icons-tabler-outline icon-tabler-arrows-down-up ' + className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3l0 18" />
      <path d="M10 18l-3 3l-3 -3" />
      <path d="M7 21l0 -18" />
      <path d="M20 6l-3 -3l-3 3" />
    </svg>
  );
}
