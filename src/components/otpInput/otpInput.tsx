"use client";
import React, {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import "./otpInput.css";
import { loginComponentState } from "@/types/login";

interface otpInputProps {
  componentState: loginComponentState;
  setComponentState: (state: loginComponentState) => void;
  length: number;
}

const OtpInput: React.FC<otpInputProps> = ({
  length,
  componentState,
  setComponentState,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // if (isNaN(parseInt(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setComponentState({
      ...componentState,
      otp: newOtp.join(""),
    });

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRef.current[index - 1]
    ) {
      console.log("backspace is clicked");

      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setComponentState({
        ...componentState,
        otp: newOtp.join(""),
      });
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            ref={(input) => {
              inputRef.current[index] = input as HTMLInputElement;
            }}
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`shadow-custom bg-background-secondary border ${
              componentState?.otpError
                ? "border-error-color"
                : "border-border-color-primary"
            } w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] m-2 rounded-lg text-center spinner focus:outline-primary`}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
