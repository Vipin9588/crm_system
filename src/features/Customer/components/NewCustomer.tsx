import { useState, useRef, useCallback } from "react";
import { useFormik } from "formik";
import { UserCircle2, Upload, X, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";

const validate = (values: typeof initialValues) => {
  const errors: Partial<typeof values & { image: string }> = {};

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

const initialValues = {
  name: "",
  email: "",
  contact: "",
  customerId: "",
  userId: "",
  socialLink: [] as string[],
  createdAt: new Date().toISOString(),
};

export default function AddCustomerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [socialInput, setSocialInput] = useState("");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log({ ...values, profileFile });
      setSubmitted(true);
      console.log("true",values)
      setTimeout(() => {
        setSubmitted(false);
        resetForm();
        setProfilePreview(null);
        setProfileFile(null);
        setSocialInput("");
      }, 3000);
    },
  });


  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setProfileFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setProfilePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );


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

  
  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    readonly
  }: {
    label: string;
    name: keyof typeof initialValues;
    type?: string;
    placeholder?: string;
    readonly?:boolean;
  }) => {
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
          className={[
            "w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground",
            "placeholder:text-muted-foreground outline-none transition-all duration-150",
            "focus:ring-2 focus:ring-ring/40 focus:border-primary",
            hasError
              ? "border-danger bg-danger/5 focus:ring-danger/30"
              : "border-border",
          ].join(" ")}
        />
        {hasError && (
          <span className="text-[11px] font-medium text-danger">
            {formik.errors[name] as string}
          </span>
        )}
      </div>
    );
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

        <div className="rounded-[--radius-xl] border border-border bg-card shadow-sm overflow-hidden">

          <div className="border-b border-border bg-muted/40 px-6 py-5">
            <h1 className="text-lg font-bold text-foreground">Add New Customer</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Fill in the details below to create a customer record.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-6 py-6 flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Profile Picture
              </span>

              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div
                    className={[
                      "h-20 w-20 rounded-full bordeborder-dashed flex items-center justify-center overflow-hidden",
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
                      onClick={() => { setProfilePreview(null); setProfileFile(null); }}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-danger text-white flex items-center justify-center shadow"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>
                  )}
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={[
                    "flex-1 rounded-[--radius-md] border border-dashed cursor-pointer",
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

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            </div>

            <div className="border-t border-border" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" placeholder="e.g. Jolly " />
              <Field label="Email Address" name="email" type="email" placeholder="e.g. jolly@gmail.com" />
              <Field label="Contact Number" name="contact" placeholder="e.g. 45455454" />
              <Field label="Customer ID" name="customerId" placeholder="e.g. CUS-142" />
              <Field label="User ID" name="userId" readonly={true} placeholder="e.g. dsdsd" />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Created At
                </label>
                <input
                  type="text"
                  value={formik.values.createdAt}
                  readOnly
                  className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            
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
                    if (e.key === "Enter") { e.preventDefault(); addSocialLink(); }
                  }}
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="flex items-center gap-1.5 rounded-[--radius-md] bg-accent text-accent-foreground border border-border px-4 text-sm font-semibold hover:bg-accent/70 transition-colors"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>

              {formik.values.socialLink.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formik.values.socialLink.map((link, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold"
                    >
                      {link}
                      <button
                        type="button"
                        onClick={() => removeSocialLink(i)}
                        className="text-primary/60 hover:text-danger transition-colors"
                      >
                        <X size={11} strokeWidth={3} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── Actions ── */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setSocialInput("");
                  setProfilePreview(null);
                  setProfileFile(null);
                }}
                className="rounded-[--radius-md] border border-border bg-background px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={formik.isSubmitting || submitted}
                className={[
                  "flex items-center gap-2 rounded-[--radius-md] px-6 py-2.5 text-sm font-bold transition-all duration-200",
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