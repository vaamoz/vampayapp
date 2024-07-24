"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { countDownTime } from "@/config/mainCOnfig.json";
import { countdownTimer } from "@/utils/countDownTimer";
import AuthBackDrop from "@/custom/backDrop/backDropComponent";
import PhoneOtpVerify from "./phoneOtpVerify";
import ForgetPassword from "./forgetPassword";
import { getDeviceInfo } from "@/helper/deviceInfo";
import {
  deviceData,
  loginComponentState,
  loginDataType,
  passwordType,
} from "@/types/login";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import CustomInput from "@/custom/inputs/customInput";
import {
  useUpdateLoginMutation,
  useVerifyOtpMutation,
} from "@/lib/features/auth/loginApi";
import { loginSchema } from "@/lib/validation/formValidation";

type LoginFormValues = z.infer<typeof loginSchema>;
const LoginComponent = () => {
  const [countDown, setCountDown] = useState<string>("00:00");
  const [showTime, setShowTime] = useState<boolean>(false);
  const [updateLogin] = useUpdateLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userid: "",
      password: "",
    },
  });

  const [componentState, setComponentState] = useState<loginComponentState>({
    currentScreen: "login",
    showOtpPopup: false,
    showForgetPassPopup: false,
    verifySuccess: false,
    mobile: "",
    otp: "",
    longitude: "72.8374525",
    latitude: "19.0864",
    browser_details:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    otpError: false,
    showSuccessPopup: false,
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

  const onSubmit = async (data: loginDataType) => {
    try {
      const response = await updateLogin({
        userid: data.userid,
        password: data.password,
      }).unwrap();
      if (response?.status) {
        setComponentState({
          ...componentState,
          showOtpPopup: true,
          mobile: data?.userid,
        });
        if (response?.data?.token) {
        }
      }
    } catch (error) {
      console.error("Failed to update login:", error);
    }
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
          name="userid"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Enter Mobile Number"
              label="Mobile Number"
              error={errors?.userid?.message}
            />
          )}
        />

        <div className="flex flex-col gap-1">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder="Enter Your Password"
                label="Password"
                src="passwordlock"
                imageWidth={24}
                imageHeight={24}
                order={1}
                error={errors?.password?.message}
              />
            )}
          />

          <p
            className="text-right text-primary cursor-pointer"
            onClick={() => {
              setComponentState({
                ...componentState,
                showForgetPassPopup: true,
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
      <PhoneOtpVerify
        componentState={componentState}
        setComponentState={setComponentState}
      />
      {/* <ForgetPassword
        showForgetPassPopup={componentState?.showForgetPassPopup}
        setComponentState={setComponentState}
        componentState={componentState}
      /> */}
      <AuthBackDrop openBackDrop={componentState?.showOtpPopup} />
    </div>
  );
};

export default LoginComponent;
