/* eslint-disable @typescript-eslint/no-unused-vars */
export const FilterTag = ({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg
      flex items-center gap-2 border-2
      ${selected ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"}
    `}
  >
    <span>{label}</span>
    <span
      className={`
        px-2 py-1 rounded-full text-xs font-bold
        ${selected ? "bg-white text-blue-600" : "bg-gray-100 text-gray-600"}
      `}
    >
      {count}
    </span>
  </button>
);

