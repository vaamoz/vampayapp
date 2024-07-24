import CustomInput from "@/custom/inputs/customInput";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";

const ForgetPassForm = ({
  newPassword,
  handlePasswordFormData,
}: {
  newPassword: { password: string; confirmPassword: string };
  handlePasswordFormData: (value: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form className="w-full flex flex-col gap-4 ">
      <p className="font-semibold text-[30px] text-text-primary text-center">
        Create Password
      </p>

      <CustomInput
        placeholder="Enter New Password"
        value={newPassword?.password}
        onChange={handlePasswordFormData}
        label="New Password"
        src="passwordlock"
        imageWidth={24}
        imageHeight={24}
        order={1}
      />
      <CustomInput
        placeholder="Confirm Password"
        value={newPassword?.confirmPassword}
        onChange={handlePasswordFormData}
        label="Confirm Password"
        src="passwordlock"
        imageWidth={24}
        imageHeight={24}
        order={1}
      />
      <Button variant="contained" className="p-3">
        login
      </Button>
      <Button variant="text" className="p-3">
        Back To Login
      </Button>
    </form>
  );
};

export default ForgetPassForm;
