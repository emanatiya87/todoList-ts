interface InputProps {
  tagName: string;
  register: any;
  error?: string;
  value?: string;
  type?: string;
}

export default function Input({
  tagName,
  register,
  error,
  value,
  type,
}: InputProps) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        id={tagName}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
          border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-600"
          }
          dark:text-white dark:border-gray-600 dark:focus:border-blue-500`}
        placeholder=" "
        {...register}
        defaultValue={value}
      />
      <label
        htmlFor={tagName}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 
          left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {tagName}
      </label>

      {/* show error message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
