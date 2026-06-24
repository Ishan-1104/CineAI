const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-slate-900
        border
        border-slate-700
        focus:outline-none
        focus:ring-2
        focus:ring-red-500
        transition-all
      "
    />
  );
};

export default Input;