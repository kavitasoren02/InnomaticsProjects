import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputWithLabel = ({ label, type, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative mb-4">
      {/* Label for the input */}
      {label && (
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}

      {/* Input field */}
      <div>
        <div className="relative">
          <input
            {...props}
            type={showPassword && type === "password" ? "text" : type}
            className="w-full px-4 py-2 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          />
          {/* Show eye icon if the input type is password */}
          {type === "password" && (
            <div
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default InputWithLabel;
