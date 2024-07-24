"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { countDownTime } from "@/config/mainCOnfig.json";
import { countdownTimer } from "@/utils/countDownTimer";
import AuthBackDrop from "@/custom/backDrop/backDropComponent";
import PhoneOtpVerify from "@/components/auth/phoneOtpVerify";
import ForgetPassword from "@/components/auth/forgetPassword";
import { getDeviceInfo } from "@/helper/deviceInfo";
import { deviceData, loginDataType, passwordType } from "@/types/login";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import CustomInput from "@/custom/inputs/customInput";

const loginSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "user", "guest"], {
    required_error: "Role is required",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
const LoginComponent = () => {
  const [countDown, setCountDown] = useState<string>("00:00");
  const [showTime, setShowTime] = useState<boolean>(false);
  const [userData, setUserData] = useState<loginDataType>({
    userid: "",
    password: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: userData.userid,
      password: userData.password,
    },
  });

  const [newPassword, setNewPassword] = useState<passwordType>({
    password: "",
    confirmPassword: "",
  });
  const [componentState, setComponentState] = useState({
    currentScreen: "login",
    showOtpPopup: false,
    showForgetPassPopup: false,
    authBackDrop: false,
    verifySuccess: false,
  });

  useEffect(() => {
    let timer = countDownTime;
    if (showTime) {
      const interval = setInterval((): void => {
        setCountDown(countdownTimer(timer));
        if (timer-- <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [showTime]);

  const handleLoginFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const onSubmit = (data: LoginFormValues) => {
    // Handle form submission
    console.log("Form Data:", data);
  };

  return (
    <div className="shadow-custom p-10 rounded-lg flex flex-col gap-4 justify-center items-center">
      <div className="">
        <Image src={"/adminlogo.svg"} alt={"."} height={145} width={145} />
      </div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <CustomInput
              placeholder="Enter Mobile Number"
              label="Mobile Number"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                handleLoginFormData(e);
              }}
            />
          )}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <div className="flex flex-col gap-1">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomInput
                placeholder="Enter Your Password"
                value={field.value}
                label="Password"
                src="passwordlock"
                imageWidth={24}
                imageHeight={24}
                order={1}
                onChange={(e) => {
                  field.onChange(e);
                  handleLoginFormData(e);
                }}
              />
            )}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <p
            className="text-right text-primary cursor-pointer"
            onClick={() => {
              setComponentState({
                ...componentState,
                showForgetPassPopup: true,
                authBackDrop: true,
              });
            }}
          >
            Forgot Password?
          </p>
        </div>
        <Button variant="contained" className="p-3" type="submit">
          Login
        </Button>
      </form>
      {/* <PhoneOtpVerify showOtpPopup={componentState?.showOtpPopup} /> */}
      <ForgetPassword
        showForgetPassPopup={componentState?.showForgetPassPopup}
        setComponentState={setComponentState}
        componentState={componentState}
      />
      <AuthBackDrop openBackDrop={componentState?.authBackDrop} />
    </div>
  );
};

export default LoginComponent;
