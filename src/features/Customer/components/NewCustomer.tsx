import { useState, useRef, useCallback, useMemo, memo } from "react";
import { useFormik } from "formik";
import { UserCircle2, Upload, X, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/Context/Authcontext/AuthProvider";
import { uploadImageToCloudinary } from "@/services/cloudnairy";
import { AddToCollection } from "@/services/userService";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

type FormValues = {
  name: string;
  email: string;
  contact: string;
  pic: File | null;
  customerId: string;
  userId: string;
  socialLink: string[];
  createdAt: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Name is required";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
    errors.email = "Invalid email address";

  if (!values.contact.trim()) errors.contact = "Contact is required";
  else if (!/^\d{7,15}$/.test(values.contact))
    errors.contact = "Enter a valid phone number (7–15 digits)";

  if (!values.customerId.trim()) errors.customerId = "Customer ID is required";
  if (!values.userId.trim()) errors.userId = "User ID is required";

  return errors;
};

const generateCustomerId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CUS-${random}-${Date.now()}`;
};

type FieldProps = {
  label: string;
  name: keyof FormValues;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  formik: ReturnType<typeof useFormik<FormValues>>;
};

export const Field = memo(
  ({ label, name, type = "text", placeholder, readonly, formik }: FieldProps) => {
    const hasError = formik.touched[name] && formik.errors[name];

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={name}
          className="text-xs font-semibold uppercase tracking-wide text-foreground/60"
        >
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          readOnly={readonly}
          placeholder={placeholder}
          value={formik.values[name] as string}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={[
            "w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-all",
            "focus:ring-2 focus:ring-ring/40 focus:border-primary",
            hasError ? "border-danger" : "border-border",
          ].join(" ")}
        />

        {hasError && (
          <span id={`${name}-error`} className="text-[11px] text-danger">
            {formik.errors[name] as string}
          </span>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

export default function AddCustomerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [socialInput, setSocialInput] = useState("");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Stable across the component's life so it doesn't change if `user` loads later.
  const customerId = useMemo(() => generateCustomerId(), []);

  const initialValues = useMemo<FormValues>(
    () => ({
      name: "",
      email: "",
      contact: "",
      pic: null,
      customerId,
      userId: user?.uid || "",
      socialLink: [],
      createdAt: new Date().toISOString(),
    }),
    [customerId, user?.uid]
  );

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = new FormData();
        payload.append("name", values.name.trim());
        payload.append("email", values.email.trim());
        payload.append("contact", values.contact.trim());
        payload.append("customerId", values.customerId);
        payload.append("userId", values.userId);
        payload.append("createdAt", values.createdAt);
        payload.append("socialLink", JSON.stringify(values.socialLink));
        if (values.pic) {
          const profilePic = await uploadImageToCloudinary(values.pic);

          console.log("Cloudinary URL:", profilePic);

          const customerData = {
            ...values,
            pic: profilePic,
          };

          console.log("Data saving:", customerData);

          await AddToCollection("Customers", customerData);
        }
  

        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          resetForm();
          setSocialInput("");
          setProfilePreview(null);
          setProfileFile(null);
          setFileError(null);
        }, 1500);
      } catch (err) {
        console.error("Failed to save customer:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setFileError("Please upload an image file.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Image must be 5 MB or smaller.");
        return;
      }
      setFileError(null);
      setProfileFile(file);
      formik.setFieldValue("pic", file);
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [formik]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const removeProfileImage = () => {
    setProfilePreview(null);
    setProfileFile(null);
    setFileError(null);
    formik.setFieldValue("pic", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addSocialLink = () => {
    const trimmed = socialInput.trim();
    if (trimmed && !formik.values.socialLink.includes(trimmed)) {
      formik.setFieldValue("socialLink", [...formik.values.socialLink, trimmed]);
      setSocialInput("");
    }
  };

  const removeSocialLink = (i: number) =>
    formik.setFieldValue(
      "socialLink",
      formik.values.socialLink.filter((_, idx) => idx !== i)
    );

  const handleReset = () => {
    formik.resetForm();
    setSocialInput("");
    setProfilePreview(null);
    setProfileFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Customers
        </button>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border bg-muted/40 px-6 py-5">
            <h1 className="text-lg font-bold text-foreground">Add New Customer</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Fill in the details below to create a customer record.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-6 py-6 flex flex-col gap-6">
            {/* Profile picture */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Profile Picture
              </span>

              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div
                    className={[
                      "h-20 w-20 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden",
                      "transition-colors duration-200",
                      profilePreview ? "border-primary" : "border-border bg-muted",
                    ].join(" ")}
                  >
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircle2 size={36} className="text-muted-foreground" />
                    )}
                  </div>
                  {profilePreview && (
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      aria-label="Remove profile picture"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-danger text-white flex items-center justify-center shadow"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                    className={[
                      "rounded-md border border-dashed cursor-pointer",
                      "flex flex-col items-center justify-center gap-1.5 py-5 px-4",
                      "transition-all duration-200",
                      dragOver
                        ? "border-primary bg-accent"
                        : "border-border bg-muted/30 hover:border-primary/50 hover:bg-accent/50",
                    ].join(" ")}
                  >
                    <Upload size={18} className="text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      {profileFile ? profileFile.name : "Drop image here or click to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP · Max 5 MB</p>
                  </div>

                  {fileError && <span className="text-[11px] text-danger">{fileError}</span>}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name="pic"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Core fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field formik={formik} label="Full Name" name="name" placeholder="e.g. Jolly" />
              <Field
                formik={formik}
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g. jolly@gmail.com"
              />
              <Field
                formik={formik}
                label="Contact Number"
                name="contact"
                placeholder="e.g. 45455454"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Customer ID
                </label>
                <input
                  type="text"
                  value={formik.values.customerId}
                  readOnly
                  className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  User ID
                </label>
                <input
                  type="text"
                  value={formik.values.userId}
                  readOnly
                  className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Created At
                </label>
                <input
                  type="text"
                  value={new Date(formik.values.createdAt).toLocaleString()}
                  readOnly
                  className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Social Links
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. instagram, facebook"
                  value={socialInput}
                  onChange={(e) => setSocialInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSocialLink();
                    }
                  }}
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="flex items-center gap-1.5 rounded-md bg-accent text-accent-foreground border border-border px-4 text-sm font-semibold hover:bg-accent/70 transition-colors"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>

              {formik.values.socialLink.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formik.values.socialLink.map((link, i) => (
                    <span
                      key={`${link}-${i}`}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold"
                    >
                      {link}
                      <button
                        type="button"
                        onClick={() => removeSocialLink(i)}
                        aria-label={`Remove ${link}`}
                        className="text-primary/60 hover:text-danger transition-colors"
                      >
                        <X size={11} strokeWidth={3} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={formik.isSubmitting || submitted}
                className={[
                  "flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-bold transition-all duration-200",
                  submitted
                    ? "bg-success text-white"
                    : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
                  "disabled:opacity-70 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={15} />
                    Saved!
                  </>
                ) : formik.isSubmitting ? (
                  "Saving..."
                ) : (
                  "Save Customer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}