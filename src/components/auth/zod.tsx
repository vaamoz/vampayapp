import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomInput from "@/custom/inputs/customInput";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";

const loginSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({
  userData,
  handleLoginFormData,
  setComponentState,
  componentState,
}: {
  userData: { username: string; password: string };
  handleLoginFormData: (event: ChangeEvent<HTMLInputElement>) => void;
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
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: userData.username,
      password: userData.password,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // Handle form submission
    console.log("Form Data:", data);
  };

  return (
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
  );
};

export default LoginForm;
