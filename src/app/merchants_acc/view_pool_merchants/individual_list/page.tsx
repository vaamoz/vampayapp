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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

  return (
    <motion.div className="p-3 flex flex-col gap-3 ">
      <p className="text-[24px] font-bold text-text-primary">
        Due Diligence Of Seller’s Key Individuals
      </p>
      <div className="flex justify-between gap-2">
        <div className="xl:w-2/3 ">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <div className="">
                  <FormInput label="Seller Identifier" required />
                </div>
                <div className="">
                  <FormInput label="Individual Identifier" required />
                </div>
                <div className="">
                  <FormInput label="Full Name" required />
                </div>
                <div className="">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="Gender"
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="DOB (Date of birth)"
                      slots={{
                        textField: (params) => (
                          <TextField
                            required
                            fullWidth
                            {...params}
                            variant="standard"
                            sx={{
                              "& .MuiInput-underline:before": {
                                borderBottom: "1px solid currentColor",
                              },
                              "& .MuiInput-underline:hover:before": {
                                borderBottom: "1px solid currentColor",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "2px solid currentColor",
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="">
                  <FormInput label="Individual PAN" required />
                </div>
                <div className="">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="POA Number"
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
                  <FormInput label="POA Number" required />
                </div>

                <div className="">
                  <FormInput label="Commission (%)" />
                </div>
                <div className="">
                  <FormInput label="GST (%)" />
                </div>
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="POA Additional Info"
                      slots={{
                        textField: (params) => (
                          <TextField
                            required
                            fullWidth
                            {...params}
                            variant="standard"
                            sx={{
                              "& .MuiInput-underline:before": {
                                borderBottom: "1px solid currentColor",
                              },
                              "& .MuiInput-underline:hover:before": {
                                borderBottom: "1px solid currentColor",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "2px solid currentColor",
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8">
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMerchants;
