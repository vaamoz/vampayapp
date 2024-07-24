"use client";
import CustomInput from "@/custom/inputs/customInput";
import Popup from "@/global/popup/popup";
import OtpInput from "../otpInput/otpInput";
import { Button } from "@mui/material";
import VerifySuccess from "./verifySuccess";
import BackDropComponent from "@/custom/backDrop/backDropComponent";
import { FC } from "react";
import { loginComponentState } from "@/types/login";
import { useVerifyOtpMutation } from "@/lib/features/auth/loginApi";
import { useRouter } from "next/navigation";

interface PhoneOtpVerifyProps {
  componentState: loginComponentState;
  setComponentState: (state: loginComponentState) => void;
}

const PhoneOtpVerify: FC<PhoneOtpVerifyProps> = ({
  componentState,
  setComponentState,
}) => {
  const router = useRouter();
  const [verifyOtp] = useVerifyOtpMutation();
  if (!componentState?.showOtpPopup) return null;

  const onSubmitOtp = async () => {
    try {
      const response = await verifyOtp({
        otp: componentState?.otp,
        longitude: componentState?.longitude,
        latitude: componentState?.latitude,
        browser_details: componentState?.browser_details,
      }).unwrap();
      if (response?.status) {
        setComponentState({
          ...componentState,
          otpError: false,
          showSuccessPopup: true,
          showOtpPopup: false,
          mobile: "",
        });
        if (response?.data?.islogin) {
          router.push("/");
        }
      }

      if (!response?.status) {
        if (response?.data?.token) {
          setComponentState({
            ...componentState,
            otpError: true,
          });
        }
      }

      console.log(response);
    } catch (error) {
      console.error("Failed to verify otp:", error);
    }
  };

  return (
    <Popup className="">
      <div className="flex flex-col gap-4 text-text-primary items-center ">
        <div className="flex flex-col items-center gap-3 ">
          <p className="font-bold text-3xl text-center  text-nowrap ">
            Verify Phone Number
          </p>
          <p className="font-normal text-base text-center ">
            We have sent you a 4 digit code. Please enter here to Verify your
            Number.
          </p>
        </div>
        <CustomInput textBefore={"+91"} value={componentState?.mobile} />
        <OtpInput
          componentState={componentState}
          setComponentState={setComponentState}
          length={4}
        />
        {/* {showTime && <p className="text-text-secondary">{countDown}</p>} */}
        <div className="text-base font-normal text-wrap">
          <p>
            Didn’t Receive Code?
            <span className="text-primary px-1">Get a New one</span>
          </p>
        </div>
        <Button
          variant="contained"
          fullWidth
          className="p-3"
          onClick={onSubmitOtp}
          disabled={componentState?.otp.length < 3}
        >
          Verify and Continue
        </Button>
        <VerifySuccess showSuccessPop={componentState?.showSuccessPopup} />
      </div>
      <BackDropComponent
        openBackDrop={componentState?.showSuccessPopup}
        className="rounded-lg"
      />
    </Popup>
  );
};

export default PhoneOtpVerify;
