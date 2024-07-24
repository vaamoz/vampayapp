import { z } from "zod";

const fileSchema = z
  .any()
  .refine((file) => file instanceof File, {
    message: "Must be a file",
  })
  .refine(
    (file) => {
      // Check if file exists and is an instance of File before accessing its type property
      if (file && file instanceof File) {
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          file.type
        );
      } else {
        // Handle cases where file is not defined or not an instance of File
        return false;
      }
    },
    {
      message: "Only jpg, png, and pdf files are supported",
    }
  );

export const merchantSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number is required"),
  business_type_id: z.string().min(1, "Business type is required"),
  business_category_id: z.string().min(1, "Business category is required"),
  business_modal: z.string().min(1, "Business modal is required"),
  address: z.string().min(1, "Address is required"),
  accept_payment_type: z.string().min(1, "Payment type is required"),
  pan_no: z.string().min(1, "PAN number is required"),
  business_name: z.string().min(1, "Business name is required"),
  authorised_signatory_name: z
    .string()
    .min(1, "Authorized signatory name is required"),
  billing_label: z.string().min(1, "Billing label is required"),
  business_description: z.string().min(1, "Business description is required"),
  pin: z.string().min(1, "PIN is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  bank_name: z.string().min(1, "Bank name is required"),
  bank_ac_no: z.string().min(1, "Bank account number is required"),
  bank_ifsc: z.string().min(1, "Bank IFSC is required"),
  website_url: z.string().url("Invalid URL"),
  same_add: z.boolean().optional(),
  kyc_type: z.string().min(1, "KYC type is required"),
  pan_card: fileSchema,
  gst_data: fileSchema,
  cancelled_cheque: fileSchema,
  incor_certificate: fileSchema,
  authorized_sign: fileSchema,
  moa: fileSchema,
  kyc_authorized_sign: fileSchema,
});
