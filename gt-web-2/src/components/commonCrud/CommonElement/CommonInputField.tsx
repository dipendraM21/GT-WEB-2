import { TextInputField } from "@/components/core/TextInputField/TextInputField";
import { TextInputFieldProps } from "@/types/module/core/textInputField";
import React, { forwardRef } from "react";

interface CommonInputFieldProps extends Omit<TextInputFieldProps, "onChange"> {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | undefined;
  };
  onChange?: (value: string) => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
}

export const CommonInputField = forwardRef<
  HTMLInputElement,
  CommonInputFieldProps
>(
  (
    {
      name,
      label,
      placeholder,
      required = false,
      validation,
      onChange,
      errors,
      touched,
      ...props
    },
    ref
  ) => {
    const handleChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

    const getError = () => {
      if (!errors || !touched) return undefined;
      return errors[name];
    };

    const isTouched = touched?.[name] || false;
    const error = getError();

    return (
      <TextInputField
        ref={ref}
        name={name}
        label={label}
        placeholder={placeholder}
        required={required}
        isShowRequired={required}
        value={props.value || ""}
        onChange={handleChange}
        errors={error}
        touched={isTouched}
        maxLength={validation?.maxLength}
        minLength={validation?.minLength}
        {...props}
      />
    );
  }
);

CommonInputField.displayName = "CommonInputField";

// Select Input Field Component
import { SelectInputField } from "@/components/core/SelectInputField/SelectInputField";
import { SelectInputFieldProps } from "@/types/module/core/selectInputFieldModule";

interface CommonSelectFieldProps
  extends Omit<SelectInputFieldProps, "onChange"> {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options: Array<{ value: string; label: string } | string>;
  onChange?: (value: { value?: string; label?: string }) => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
}

export const CommonSelectField: React.FC<CommonSelectFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  options,
  onChange,
  errors,
  touched,
  ...props
}) => {
  const handleChange = (value: { value?: string; label?: string }) => {
    if (onChange) {
      onChange(value);
    }
  };

  const getError = () => {
    if (!errors || !touched) return undefined;
    return errors[name];
  };

  const isTouched = touched?.[name] || false;
  const error = getError();

  return (
    <SelectInputField
      name={name}
      label={label}
      placeholder={placeholder}
      isShowRequired={required}
      value={props.value || ""}
      onChange={handleChange}
      options={options}
      errors={error}
      touched={isTouched}
      {...props}
    />
  );
};

// Textarea Input Field Component
interface CommonTextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  onChange?: (value: string) => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  value?: string;
  disabled?: boolean;
}

export const CommonTextareaField: React.FC<CommonTextareaFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  rows = 4,
  validation,
  onChange,
  errors,
  touched,
  value = "",
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const getError = () => {
    if (!errors || !touched) return undefined;
    return errors[name];
  };

  const isTouched = touched?.[name] || false;
  const error = getError();

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        maxLength={validation?.maxLength}
        minLength={validation?.minLength}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error && isTouched ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : ""}`}
      />
      {error && isTouched && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
