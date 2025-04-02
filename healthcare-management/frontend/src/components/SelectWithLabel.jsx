import React from "react";

const SelectWithLabel = ({ label, options, error, ...props }) => {
  return (
    <div className="relative mb-4">
      {/* Label for the select */}
      {label && (
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}

      {/* Select dropdown */}
      <div>
        <select
          {...props}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-white text-black"
        >
          <option value="" disabled selected>
            Select an option
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SelectWithLabel;
