"use client";
import FormInput from "@/custom/textFields/formInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomStepper from "@/custom/stepper/stepper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { motion } from "framer-motion";

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
const AddMerchants = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "user",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <motion.div className="p-3 flex flex-col gap-3 ">
      <p className="text-[24px] font-bold text-text-primary">
        Set API txn Limit
      </p>
      <div className="flex justify-between gap-2">
        <div className="xl:w-2/3 ">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <div className="">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="API Type"
                          variant="standard"
                          {...field}
                          error={!!errors.role}
                          helperText={errors.role ? errors.role.message : ""}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="guest">Guest</MenuItem>
                        </TextField>
                      )}
                    />
                  </FormControl>
                </div>
                <div className="">
                  <FormInput label="API Name" />
                </div>
                <div className="">
                  <FormInput label="Number Of Transactions" />
                </div>
                <div className="">
                  <FormInput label="Transaction Amount Volume" />
                </div>
                <div className="">
                  <FormInput label="Min Transaction Amount" />
                </div>
                <div className="">
                  <FormInput label="Max Transaction Amount" />
                </div>
                <div className="">
                  <FormInput label="Commission (%)" />
                </div>
                <div className="">
                  <FormInput label="GST (%)" />
                </div>
              </div>

              <div className="flex justify-center items-center gap-8">
                <Button onClick={handleNext} variant="contained">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMerchants;
