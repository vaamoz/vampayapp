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
        Add Business Category
      </p>
      <div className="flex justify-between gap-2">
        <div className="xl:w-2/3 overflow-auto h-[85vh]">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <div className="">
                  <FormInput label="Business Category Name" />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center items-center gap-8">
                    <Button variant="contained">Add Parent Module</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMerchants;
