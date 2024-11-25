import React from "react";

interface CustomTextBoxProps {
    label?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string | boolean;
    autoComplete?: string;
    className?: string;
}

const CustomTextBox: React.FC<CustomTextBoxProps> = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error = false,
    ...props
}) => {
    return (
        <div className="relative mb-4">
            <label
                className="block text-darkGray text-sm font-bold mb-2"
                htmlFor={label}
            >
                {label}
            </label>
            <input
                type={type}
                id={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                
                className={`shadow appearance-none border rounded-xl w-full h-12 py-2 px-3 text-black leading-tight ${
                    error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-lightBlue-500`}
                {...props}
            />
            {error && (
                <p className="text-red-500 text-xs italic mt-1">
                    This field is required.
                </p>
            )}
        </div>
    );
};

export default CustomTextBox;
