import type { InputProps } from "antd";
import { Input as AntInput } from "antd";
import React from "react";
import { cn } from "@/utils/cn";
import { PasswordProps, TextAreaProps } from "antd/es/input";
import { OTPProps } from "antd/es/input/OTP";
import EyeOpenIcon from "../../icon/eye-open";
import EyeClosedIcon from "../../icon/eye-closed";

type BaseInputProps = {
  label?: string;
  error?: string;
};

const Input: React.FC<BaseInputProps & InputProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn("core-input", className)}
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-danger absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const InputPassword: React.FC<BaseInputProps & PasswordProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput.Password
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn("core-input", className)}
          iconRender={(visible) =>
            visible ? (
              <EyeClosedIcon width={20} height={20} className="!text-xl" />
            ) : (
              <EyeOpenIcon width={20} height={20} className="!text-xl" />
            )
          }
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-danger absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const InputArea: React.FC<BaseInputProps & TextAreaProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput.TextArea
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn("core-input", className)}
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-danger absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};
const InputOTP: React.FC<OTPProps> = (props) => {
  const { size = "middle", ...rest } = props;
  return <AntInput.OTP size={size} {...rest} />;
};

const CoreInput = Object.assign(Input, {
  Password: InputPassword,
  TextArea: InputArea,
  OTP: InputOTP,
});

export default CoreInput;
