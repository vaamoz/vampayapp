import Image from "next/image";
import React, {
  CSSProperties,
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";

interface inputType {
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  htmlFor?: string;
  placeholder?: string;
  innerHtml?: string;
  inputType?: string;
  disabled?: boolean;
  maxLength?: number;
  customStyle?: CSSProperties;
  customInputStyle?: CSSProperties;
  customLabelStyle?: CSSProperties;
  required?: boolean;
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
  order?: number;
  textBefore?: string;
  textBeforeStyle?: string;
}

const CustomInput: FC<inputType> = ({
  label,
  value,
  onChange,
  error,
  htmlFor,
  placeholder,
  innerHtml,
  inputType,
  disabled,
  maxLength,
  customStyle,
  customInputStyle,
  customLabelStyle,
  required = false,
  src,
  imageWidth,
  imageHeight,
  order,
  textBefore,
  textBeforeStyle,
}) => {
  return (
    <div className="flex flex-col gap-2 " style={customStyle}>
      <label
        htmlFor={htmlFor}
        className="text-[14px] font-medium text-text-primary"
        style={customLabelStyle}
      >
        {label}
      </label>
      <div
        className={`flex items-center bg-hover-bg-color rounded-[5px] w-full p-3 focus:outline-primary ${
          error ? " border  border-error-color" : " "
        }  `}
      >
        {textBefore && <p className={textBeforeStyle}>{textBefore}</p>}
        <input
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          value={value}
          type={inputType}
          name={htmlFor}
          id={htmlFor}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-hover-bg-color  px-2 w-full focus:outline-none placeholder-text-secondary caret-primary order-${order}}    `}
          style={customInputStyle}
        />
        {src && (
          <Image
            src={`/${src}.svg`}
            alt={"."}
            width={imageWidth}
            height={imageHeight}
          />
        )}
      </div>

      {error && (
        <label htmlFor={htmlFor} className="text-error-color">
          {error}
        </label>
      )}
      {innerHtml && (
        <label
          dangerouslySetInnerHTML={{ __html: innerHtml }}
          htmlFor={htmlFor}
          className="text-error-color"
        ></label>
      )}
    </div>
  );
};

export default CustomInput;
