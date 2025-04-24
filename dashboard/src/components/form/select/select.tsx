import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface SelectProps extends Omit<AntSelectProps, "value"> {
  label?: string;
  containerClassName?: string;
  error?: string;
  required?: boolean;
  value: AntSelectProps["value"];
}

const CoreSelect: React.FC<SelectProps> = (props) => {
  const {
    label,
    error,
    containerClassName,
    className,
    value,
    required = false,
    placeholder,
    loading,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={cn(
        containerClassName,
        "floating-select-container w-full",
        isFocused || value ? "active" : "",
      )}
    >
      <AntSelect
        className={cn("core-select w-full", className)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        // suffixIcon={<ChevronDown />}
        {...rest}
      />
      {loading && (
        <label
          className={cn(
            "font-medium floating-label",
            required && "label-required",
          )}
        >
          loading...
        </label>
      )}
      {!loading && label && (
        <label
          className={cn(
            "font-medium floating-label",
            required && "label-required",
            value && "label-float",
          )}
        >
          {value ? label : !!placeholder ? placeholder : label}
        </label>
      )}
      <div className="relative">
        {error && (
          <span className="text-[12px] text-danger absolute">{error}</span>
        )}
      </div>
    </div>
  );
};

// const CoreSelect = Object.assign(Select);

export default CoreSelect;
