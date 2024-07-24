import Popup from "@/global/popup/popup";
import Image from "next/image";
import { FC } from "react";

interface successPop {
  showSuccessPop: boolean;
}
const VerifySuccess: FC<successPop> = ({ showSuccessPop }) => {
  if (!showSuccessPop) return null;
  return (
    <Popup>
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="font-bold text-3xl  "> OTP Verified</p>
        <p className="font-normal text-base text-center">
          Your 4 digit code successfully verified.
        </p>
        <Image
          src={"/otpverified.svg"}
          alt={"."}
          height={100}
          width={100}
          className=" "
        />
      </div>
    </Popup>
  );
};

export default VerifySuccess;
