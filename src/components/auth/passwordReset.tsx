import { Button } from "@mui/material";

const PasswordReset = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <p className="font-medium text-[30px] text-text-primary text-center">
          Your password has been reset successfully.
        </p>
        <p className="font-normal text-text-primary text-center">
          login in into your account with your new password.
        </p>
      </div>
      <Button variant="contained" className="p-3">
        login
      </Button>
    </div>
  );
};
export default PasswordReset;
