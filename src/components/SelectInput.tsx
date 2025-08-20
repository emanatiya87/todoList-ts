interface SelectPros {
  tagName: string;
  register: UseFormRegisterReturn;
  options: { label: string; value: string }[];
  error?: string;
  value?: string;
}
export default function Select({
  tagName,
  register,
  options,
  error,
  value,
}: SelectPros) {
  return (
    <>
      <div className="relative z-0 w-full mb-5 ">
        <label htmlFor={tagName} className="sr-only">
          {tagName}
        </label>
        <select
          defaultValue={value}
          id={tagName}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          {...register}
        >
          <option selected hidden value="">
            Choose a {tagName}
          </option>
          {options.map((o) => {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}
