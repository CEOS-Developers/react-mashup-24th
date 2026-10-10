import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type ChangeEvent,
} from "react";

export interface TextFieldProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "value" | "defaultValue"> {
  externalLabel?: string;
  floatingLabel?: string;
  isError?: boolean;
  value?: string;
  defaultValue?: string;
}

function TextField({
  externalLabel,
  floatingLabel,
  isError = false,
  id,
  value,
  defaultValue = "",
  placeholder,
  disabled = false,
  className = "",
  onFocus,
  onBlur,
  onChange,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const getContainerStyle = () => {
    if (isError) {
      return "bg-surface-alert border-solid border-text-alert line-weight-regular";
    }
    if (isFocused) {
      return "bg-surface-default border-solid border-border-focused line-weight-bold";
    }
    return "bg-surface-default border-solid border-transparent line-weight-regular";
  };

  const labelColor = isError ? "text-text-alert" : "text-text-tertiary";
  const textColor = isError ? "text-text-alert" : "text-text-default";

  return (
    <div className={`flex flex-col gap-gap-4 ${className}`}>
      {externalLabel && (
        <label htmlFor={inputId} className="text-body-2-semibold text-text-default">
          {externalLabel}
        </label>
      )}

      <div
        className={`flex min-h-[56px] flex-col justify-center rounded-medium px-padding-wide py-padding-medium transition-colors ${getContainerStyle()} ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {floatingLabel && (
          <label htmlFor={inputId} className={`text-caption-1-semibold ${labelColor}`}>
            {floatingLabel}
          </label>
        )}
        <input
          {...props}
          id={inputId}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isError || undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full bg-transparent text-body-1-bold outline-none placeholder:font-normal placeholder:text-text-disabled ${textColor}`}
        />
      </div>
    </div>
  );
}


/* 현재 3칸짜리 구현은 문자열이 칸마다 각각 문자열을 제공합니다. 후에 문자열을 하나로 합쳐서 출력하는 기능 필요*/ 
interface MultiInputFieldProps {
  externalLabel?: string;
  isError?: boolean;
  disabled?: boolean;
  className?: string;
  /** 칸별로 따로 전달할 props (name, value, onChange, placeholder 등) */
  fields: TextFieldProps[];
}

export function MultiInputField({
  externalLabel,
  isError = false,
  disabled = false,
  className = "w-[362px]",
  fields,
}: MultiInputFieldProps) {
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={externalLabel ? labelId : undefined}
      className={`flex flex-col gap-gap-4 ${className}`}
    >
      {externalLabel && (
        <span id={labelId} className="text-body-2-semibold text-text-default">
          {externalLabel}
        </span>
      )}

      <div className="flex w-full gap-gap-8">
        {fields.map((field, index) => (
          <TextField
            key={field.id ?? field.name ?? index}
            {...field}
            isError={isError || field.isError}
            disabled={disabled || field.disabled}
            className={`h-[64px] flex-1 ${field.className ?? ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TextField;