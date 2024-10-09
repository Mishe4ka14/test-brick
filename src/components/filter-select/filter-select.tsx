import { Select } from 'antd';
const { Option } = Select;

interface FilterSelectProps {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: { value: string; label: string }[];
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options }) => (
  <div className="flex flex-col items-center">
    <label className="mb-1 text-white">
      <h4>{label}</h4>
    </label>
    <Select
      value={value}
      onChange={onChange}
      className="w-[40vw] sm:w-[40vw] md:w-[40vw] lg:w-[30vw]"
      placeholder={`Выберите ${label.toLowerCase()}`}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>{option.label}</Option>
      ))}
    </Select>
  </div>
);