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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomStepper from "@/custom/stepper/stepper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  useAddMerchantMutation,
  useGetBusinessCategoryQuery,
  useGetBusinessTypeQuery,
  useGetStateQuery,
} from "@/lib/features/merchants/merchantsApi";
import { merchantSchema } from "@/lib/validation/merchants";

type merchantFormData = z.infer<typeof merchantSchema>;
const AddMerchants = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    data: stateData,
    isError: IsStateError,
    isLoading: isStateLoading,
  } = useGetStateQuery();

  const {
    data: businessTypeData,
    isError: IsBusinessTypeError,
    isLoading: isBusinessTypeLoading,
  } = useGetBusinessTypeQuery();

  const {
    data: businessCategoryData,
    isError: IsBusinessCategoryError,
    isLoading: isBusinessCategoryLoading,
  } = useGetBusinessCategoryQuery();

  const [
    addMerchant,
    {
      isLoading: addMerchantLoading,
      isSuccess: addMerchantSuccess,
      isError: addMerrchantError,
      error,
    },
  ] = useAddMerchantMutation();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<merchantFormData>({
    resolver: zodResolver(merchantSchema),
  });
  console.log(watch("business_modal"), "rty=>");

  console.log(errors, "qwertyuiop=>");

  const onSubmit: SubmitHandler<merchantFormData> = async (data) => {
    // await addMerchant(data);

    console.log(data);
  };

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
      <p className="text-[24px] font-bold text-text-primary">Add Merchants</p>
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:w-2/3 overflow-auto h-[85vh]"
        >
          {activeStep === 0 && (
            <div className="">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 bg-background-secondary p-3">
                  <p className="text-[20px] font-medium text-text-primary">
                    about your business
                  </p>
                  <div className=" ">
                    <FormControl fullWidth error={!!errors.business_type_id}>
                      <Controller
                        name="business_type_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            select
                            label="Business type"
                            variant="standard"
                            {...field}
                            error={!!errors.business_type_id}
                            helperText={
                              errors.business_type_id
                                ? errors.business_type_id.message
                                : ""
                            }
                          >
                            {businessTypeData?.data?.businesstype?.map(
                              (business) => (
                                <MenuItem
                                  value={business?.id}
                                  key={business?.id}
                                >
                                  {business?.name}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className=" ">
                    <FormControl
                      fullWidth
                      error={!!errors.business_category_id}
                    >
                      <Controller
                        name="business_category_id"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            select
                            label="Business category"
                            variant="standard"
                            {...field}
                            error={!!errors.business_category_id}
                            helperText={
                              errors.business_category_id
                                ? errors.business_category_id.message
                                : ""
                            }
                          >
                            {businessCategoryData?.data?.categories?.map(
                              (category) => (
                                <MenuItem
                                  value={category?.id}
                                  key={category?.id}
                                >
                                  {category?.category_name}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className="">
                    <Controller
                      name="business_modal"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Business Model"
                          error={!!errors.business_modal}
                          helperText={
                            errors.business_modal
                              ? errors.business_modal.message
                              : ""
                          }
                        />
                      )}
                    />

                    <div className="flex justify-between items-center text-text-secondary">
                      <p>Tell us a bit about your business model</p>
                      <p>{`${"0"} / 200`}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-background-secondary p-3">
                  <p className="text-[20px] font-medium text-text-primary">
                    business Address
                  </p>
                  <div className="">
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="building number, area, street"
                          error={!!errors.address}
                          helperText={
                            errors.address ? errors.address.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className=" ">
                    <FormControl fullWidth error={!!errors.state}>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            select
                            label="Select state"
                            variant="standard"
                            {...field}
                            error={!!errors.state}
                            helperText={
                              errors.state ? errors.state.message : ""
                            }
                          >
                            {stateData?.data?.states?.map((state) => (
                              <MenuItem value={state?.id} key={state?.id}>
                                {state?.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className=" ">
                    <FormControl fullWidth error={!!errors.city}>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            select
                            label="city"
                            variant="standard"
                            {...field}
                            error={!!errors.city}
                            helperText={errors.city ? errors.city.message : ""}
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
                    <Controller
                      name="pin"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="pincode"
                          maxLength={6}
                          error={!!errors.pin}
                          helperText={errors.pin ? errors.pin.message : ""}
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name="same_add"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <FormControlLabel
                          {...field}
                          control={
                            <Checkbox
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          }
                          label="Operational address is the same as above"
                        />
                      )}
                    />

                    <p className="text-text-secondary">
                      Physical verification may take place
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-background-secondary p-3">
                  <p className="text-[20px] font-medium text-text-primary">
                    Contact Details
                  </p>
                  <div className="">
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="First Name"
                          error={!!errors.first_name}
                          helperText={
                            errors.first_name ? errors.first_name.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Last Name"
                          error={!!errors.last_name}
                          helperText={
                            errors.last_name ? errors.last_name.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="email"
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      )}
                    />
                  </div>
                  {/* <div className="">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Generate password"
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      )}
                    />
                  </div> */}
                </div>
                <div className="flex flex-col gap-3 bg-background-secondary p-3">
                  <p className="text-[20px] font-medium text-text-primary">
                    how do i accept payments
                  </p>
                  {/* <div className="">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="without website/app"
                          control={<Radio />}
                          label="without website/app"
                        />
                        <ul className="text-text-secondary list-disc ml-8">
                          <li>
                            Receive payment from your customer in under 5
                            minutes using vampay’s payment page and payment
                            links.
                          </li>
                          <li>
                            you can submit your website/app anytime later if you
                            wish to accept payment using it
                          </li>
                        </ul>
                        <FormControlLabel
                          value="on my website/app"
                          control={<Radio />}
                          label="on my website/app"
                        />
                        <div className="text-text-secondary flex flex-col gap-2">
                          <Controller
                            name="website_url"
                            control={control}
                            render={({ field }) => (
                              <FormInput
                                {...field}
                                label="website URL"
                                error={!!errors.website_url}
                                helperText={
                                  errors.website_url
                                    ? errors.website_url.message
                                    : ""
                                }
                              />
                            )}
                          />
                          <p>
                            We need to verify your website/app to provide live
                            API key. it should contain :
                          </p>
                          <div className="flex justify-around items-center">
                            <ul className="text-text-secondary list-disc ml-8">
                              <li>about us</li>
                              <li>contact us</li>
                              <li>pricing</li>
                            </ul>
                            <ul className="text-text-secondary list-disc ml-8">
                              <li>terms & conditions</li>
                              <li>privacy policy</li>
                              <li>refund policy</li>
                            </ul>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div> */}

                  <div className="">
                    <FormControl>
                      <div aria-labelledby="demo-checkbox-group-label">
                        <Controller
                          name="accept_payment_type"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              {...field}
                              control={
                                <Checkbox
                                  checked={!!field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    field.value =
                                      e.target.value && "without website/app";
                                  }}
                                />
                              }
                              label="without website/app"
                            />
                          )}
                        />
                        <ul className="text-text-secondary list-disc ml-8">
                          <li>
                            Receive payment from your customer in under 5
                            minutes using vampay’s payment page and payment
                            links.
                          </li>
                          <li>
                            You can submit your website/app anytime later if you
                            wish to accept payment using it.
                          </li>
                        </ul>
                        <Controller
                          name="accept_payment_type"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              {...field}
                              control={
                                <Checkbox
                                  checked={!!field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    field.value =
                                      e.target.value && field?.value.length > 1
                                        ? "both"
                                        : "on my website/app";
                                  }}
                                />
                              }
                              label="on my website/app"
                            />
                          )}
                        />
                        <div className="text-text-secondary flex flex-col gap-2">
                          <Controller
                            name="website_url"
                            control={control}
                            render={({ field }) => (
                              <FormInput
                                {...field}
                                label="website URL"
                                error={!!errors.website_url}
                                helperText={
                                  errors.website_url
                                    ? errors.website_url.message
                                    : ""
                                }
                              />
                            )}
                          />
                          <p>
                            We need to verify your website/app to provide live
                            API key. It should contain:
                          </p>
                          <div className="flex justify-around items-center">
                            <ul className="text-text-secondary list-disc ml-8">
                              <li>About us</li>
                              <li>Contact us</li>
                              <li>Pricing</li>
                            </ul>
                            <ul className="text-text-secondary list-disc ml-8">
                              <li>Terms & Conditions</li>
                              <li>Privacy Policy</li>
                              <li>Refund Policy</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
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
                    <Controller
                      name="pan_no"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Business PAN"
                          error={!!errors.pan_no}
                          helperText={
                            errors.pan_no ? errors.pan_no.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name="business_name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Business Name"
                          error={!!errors.business_name}
                          helperText={
                            errors.business_name
                              ? errors.business_name.message
                              : ""
                          }
                        />
                      )}
                    />
                    <p className="text-text-secondary">
                      As mentioned in the PAN
                    </p>
                  </div>

                  <div className="">
                    <Controller
                      name="authorised_signatory_name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="authorized signatory name"
                          error={!!errors.authorised_signatory_name}
                          helperText={
                            errors.authorised_signatory_name
                              ? errors.authorised_signatory_name.message
                              : ""
                          }
                        />
                      )}
                    />
                    <p className="text-text-secondary">
                      As mentioned in the PAN
                    </p>
                  </div>

                  <div className="">
                    <Controller
                      name="billing_label"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="billing label"
                          error={!!errors.billing_label}
                          helperText={
                            errors.billing_label
                              ? errors.billing_label.message
                              : ""
                          }
                        />
                      )}
                    />
                    <p className="text-text-secondary">
                      Something that your customer are familiar with
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
                    <Controller
                      name="bank_name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Bank Name"
                          error={!!errors.bank_name}
                          helperText={
                            errors.bank_name ? errors.bank_name.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name="bank_ac_no"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Account Number"
                          error={!!errors.bank_ac_no}
                          helperText={
                            errors.bank_ac_no ? errors.bank_ac_no.message : ""
                          }
                        />
                      )}
                    />
                  </div>

                  <div className="">
                    <Controller
                      name="bank_ifsc"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="IFSC Code"
                          error={!!errors.bank_ifsc}
                          helperText={
                            errors.bank_ifsc ? errors.bank_ifsc.message : ""
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-background-secondary p-3">
                  <div className="">
                    <p className="text-[20px] font-medium text-text-primary">
                      GST
                    </p>
                  </div>

                  {/* <div className="">
                    <Controller
                      name="gst_number"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Your GST Number"
                          error={!!errors.bank_ifsc}
                          helperText={
                            errors.bank_ifsc ? errors.bank_ifsc.message : ""
                          }
                        />
                      )}
                    />
                  </div> */}
                  {/* <div className="">
                    <Controller
                      name="gst_d"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Vampay GST Number"
                          error={!!errors.bank_ifsc}
                          helperText={
                            errors.bank_ifsc ? errors.bank_ifsc.message : ""
                          }
                        />
                      )}
                    />
                  </div> */}
                </div>
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
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-background-secondary p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[20px] font-medium text-text-primary">
                      KYC Documents
                    </p>
                    <p className="text-error-color">
                      NOTE : File format should be JPG, PNG, or PDF.
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        Organisation pan card
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="pan_card"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />

                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        Incorporation Certificate
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="incor_certificate"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        GST Certificate
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="gst_data"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary ">
                        Board resolution in favour of authorised signatory
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="authorized_sign"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
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
                        <Controller
                          name="cancelled_cheque"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        Memorandum of association (MOA)
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="moa"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        KYC Document of authorised signatory
                        <span className="text-error-color">*</span>
                      </p>

                      <div className="xl:pr-10">
                        <FormControl fullWidth error={!!errors.city}>
                          <Controller
                            name="kyc_type"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                select
                                label="Select Document"
                                variant="outlined"
                                size="small"
                                {...field}
                                error={!!errors.kyc_type}
                                helperText={
                                  errors.kyc_type ? errors.kyc_type.message : ""
                                }
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
                    <div className="flex flex-col gap-2 w-1/2">
                      <p className="text-text-primary">
                        KYC Document of authorised signatory
                        <span className="text-error-color">*</span>
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <Controller
                          name="kyc_authorized_sign"
                          control={control}
                          render={({ field }) => (
                            <Button
                              {...field}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          )}
                        />
                        <p className="text-text-secondary">No file choosen</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                  >
                    Back
                  </Button>
                  <Button
                    // onClick={handleNext}
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Add Merchant
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
        <div className="flex justify-center items-start xl:w-1/3 h-[85vh] ">
          <CustomStepper activeStep={activeStep} />
        </div>
      </div>
    </motion.div>
  );
};

export default AddMerchants;
