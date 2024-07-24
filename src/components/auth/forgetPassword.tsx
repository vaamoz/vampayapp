import CustomInput from "@/custom/inputs/customInput";
import Popup from "@/global/popup/popup";
import OtpInput from "../otpInput/otpInput";
import { Button } from "@mui/material";
import VerifySuccess from "./verifySuccess";
import BackDropComponentForget from "@/custom/backDrop/backDropComponent";
import { FC } from "react";
import PhoneOtpVerify from "./phoneOtpVerify";

interface forgetPassPop {
  showForgetPassPopup: boolean;
  setComponentState: (value: {
    currentScreen: string;
    showOtpPopup: boolean;
    showForgetPassPopup: boolean;
    authBackDrop: boolean;
    verifySuccess: boolean;
  }) => void;
  componentState: {
    currentScreen: string;
    showOtpPopup: boolean;
    showForgetPassPopup: boolean;
    authBackDrop: boolean;
    verifySuccess: boolean;
  };
}
const ForgetPassword: FC<forgetPassPop> = ({
  showForgetPassPopup,
  setComponentState,
  componentState,
}) => {
  if (!showForgetPassPopup) return null;
  return (
    <Popup className="">
      <div className="flex flex-col gap-4 text-text-primary items-center">
        <div className="flex flex-col items-center gap-3 ">
          <p className="font-bold text-3xl  ">Forgot Password</p>
          <p className="font-normal text-base text-center ">
            Enter the mobile number you used to create your account so we can
            send you OTP for reseting your password.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <CustomInput textBefore={"+91"} placeholder="Enter Mobile Number" />
          <Button variant="contained" fullWidth className="p-3">
            Send
          </Button>
          <Button
            variant="text"
            fullWidth
            className="p-3"
            onClick={() => {
              setComponentState({
                ...componentState,
                showForgetPassPopup: false,
                authBackDrop: false,
              });
            }}
          >
            Back to login
          </Button>
        </div>
      </div>
      {/* <PhoneOtpVerify showOtpPopup={false} /> */}
      <BackDropComponentForget openBackDrop={false} className="rounded-lg" />
    </Popup>
  );
};

export default ForgetPassword;
