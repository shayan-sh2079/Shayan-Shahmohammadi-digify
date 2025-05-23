interface Props {
  options: number[];
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export default function Select({ options, value, onChange, label }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="items-per-page"
        className="text-sm whitespace-nowrap text-gray-600"
      >
        {label}:
      </label>
      <select
        id="items-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
