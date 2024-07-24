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

  return (
    <motion.div className="p-3 flex flex-col gap-3 h-[85vh] overflow-auto ">
      <p className="text-[24px] font-bold text-text-primary">
        Add Pool Merchants
      </p>
      <div className="flex justify-between gap-2">
        <div className="xl:w-2/3 overflow-auto h-[85vh]">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  Make Pool Merchant
                </p>
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="Select Merchant"
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
                  <FormInput label="Seller Identifier" required />
                </div>

                <div className="">
                  <FormInput label="Mobile Number" required />
                  {/* <div className="flex justify-between items-center text-text-secondary">
                      <p>Tell us a bit about your business model</p>
                      <p>{`${"0"} / 200`}</p>
                    </div> */}
                </div>
                <div className="">
                  <FormInput label="Email address" required />
                </div>
              </div>
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  About Your Business
                </p>
                <div className="">
                  <FormInput label="Business Name" />
                </div>
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="Turnover type"
                          variant="standard"
                          {...field}
                          error={!!errors.role}
                          helperText={errors.role ? errors.role.message : ""}
                          required
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="guest">Guest</MenuItem>
                        </TextField>
                      )}
                    />
                  </FormControl>
                </div>
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          select
                          label="Acceptance Type"
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
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          select
                          label="Ownership Type"
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
              </div>
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  Settlement Account Details
                </p>
                <div className="">
                  <FormInput label="Settlement account Name" required />
                </div>
                <div className="">
                  <FormInput label="Settlement Account Number" required />
                </div>
                <div className="">
                  <FormInput label="Settlement Account IFSC Code" required />
                </div>
              </div>

              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  Business Address
                </p>
                <div className="">
                  <FormInput label="Building Number, Area, Street" required />
                </div>
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="Select State"
                          variant="standard"
                          {...field}
                          error={!!errors.role}
                          helperText={errors.role ? errors.role.message : ""}
                          required
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="guest">Guest</MenuItem>
                        </TextField>
                      )}
                    />
                  </FormControl>
                </div>
                <div className=" ">
                  <FormControl fullWidth error={!!errors.role}>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label="City"
                          variant="standard"
                          {...field}
                          error={!!errors.role}
                          helperText={errors.role ? errors.role.message : ""}
                          required
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
                  <FormInput label="Pincode" required />
                </div>
                <div className="">
                  <FormInput label="Latitude" required />
                </div>
                <div className="">
                  <FormInput label="Longitude" required />
                </div>
              </div>

              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  Business Address
                </p>
                <div className="">
                  <FormInput label="LLP IN/CIN" required />
                </div>
                <div className="">
                  <FormInput label="Udyog aadhaar" required />
                </div>
                <div className="">
                  <FormInput label="Electricity bill number" required />
                </div>
                <div className="">
                  <FormInput label="Electricity Board code" required />
                </div>
                <div className="">
                  <FormInput label="date of formation" required />
                </div>
                <div className="">
                  <FormInput label="Date of Incorporation" required />
                </div>

                <div className="">
                  <FormInput label="Website URL/APP Package name" required />
                </div>
                <div className="">
                  <FormInput label="Service type" required />
                </div>
                <div className="">
                  <FormInput label="E-Collect account number" required />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <Button variant="contained">Add Merchant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMerchants;
