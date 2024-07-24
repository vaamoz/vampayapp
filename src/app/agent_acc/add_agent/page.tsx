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
    <motion.div className="p-3 flex flex-col gap-3 h-[85vh] overflow-auto ">
      <p className="text-[24px] font-bold text-text-primary">Add Agent</p>
      <div className="flex justify-between gap-2">
        <div className="xl:w-2/3 overflow-auto h-[85vh]">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 bg-background-secondary p-3">
                <p className="text-[20px] font-medium text-text-primary">
                  Contact Details
                </p>

                <div className="">
                  <FormInput label="Name" />
                </div>
                <div className="">
                  <FormInput label="Email" />
                </div>
                <div className="">
                  <FormInput label="Generate password" />
                </div>
              </div>

              <div className="">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 bg-background-secondary p-3">
                    <div className="">
                      <p className="text-[20px] font-medium text-text-primary">
                        PAN Details
                      </p>
                      <p className="text-text-secondary">
                        These details will be verified with the government
                        database
                      </p>
                    </div>

                    <div className="">
                      <FormInput label="PAN NUMBER" />
                    </div>
                    <div className="">
                      <FormInput label="NAME" />
                      <p className="text-text-secondary">
                        As mentioned in the PAN
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 bg-background-secondary p-3">
                    <div className="">
                      <p className="text-[20px] font-medium text-text-primary">
                        Adhar card Details
                      </p>
                      <p className="text-text-secondary">
                        These details will be verified with the government
                        database
                      </p>
                    </div>

                    <div className="">
                      <FormInput label="Adhar card Number" />
                    </div>
                    <div className="">
                      <FormInput label="NAME" />
                      <p className="text-text-secondary">
                        As mentioned in the PAN
                      </p>
                    </div>

                    <div className="">
                      <FormInput label="DOB" />
                      <p className="text-text-secondary">
                        As mentioned in the PAN
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 bg-background-secondary p-3">
                    <div className="">
                      <p className="text-[20px] font-medium text-text-primary">
                        Account details
                      </p>
                    </div>

                    <div className="">
                      <FormInput label="Bank Name" />
                    </div>
                    <div className="">
                      <FormInput label="Account Number" />
                    </div>
                    <div className="">
                      <FormInput label="IFSC Code" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 bg-background-secondary p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[20px] font-medium text-text-primary">
                        Upload Documents
                      </p>
                      <p className="text-error-color">
                        NOTE : File format should be JPG, PNG, or PDF.
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col gap-2 w-1/2">
                        <p className="text-text-primary">
                          pan card
                          <span className="text-error-color">*</span>
                        </p>
                        <div className="flex justify-start items-center gap-2">
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                          <p className="text-text-secondary">No file choosen</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-1/2">
                        <p className="text-text-primary">
                          Aadhar Card
                          <span className="text-error-color">*</span>
                        </p>
                        <div className="flex justify-start items-center gap-2">
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                          <p className="text-text-secondary">No file choosen</p>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col gap-2 w-1/2">
                        <p className="text-text-primary">
                          A/C Cancelled cheque
                          <span className="text-error-color">*</span>
                        </p>
                        <div className="flex justify-start items-center gap-2">
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                          <p className="text-text-secondary">No file choosen</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-center items-center gap-8">
                        <Button
                          onClick={handleBack}
                          variant="outlined"
                          startIcon={<ArrowBackIcon />}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNext}
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                        >
                          Add Merchant
                        </Button>
                      </div>
                    </div>
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
