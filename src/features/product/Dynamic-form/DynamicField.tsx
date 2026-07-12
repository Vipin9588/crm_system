import InputField from "../Dynamic-form/Fields/InputField";
import TextAreaField from "../Dynamic-form/Fields/TextAreaField";
import RadioField from "../Dynamic-form/Fields/RadioField";
import MultiChoiceField from "../Dynamic-form/Fields/MultiSelectField";
import SelectField from "../Dynamic-form/Fields/SelectField";
import { FormField } from "../Dynamic-form/form";
import { productDatatype } from "../productStructer";
import type { FormikProps } from "formik";

type Props = {
    field: FormField;
    formik: FormikProps<productDatatype>;
};



export default function DynamicField({
    field,
    formik
}: Props) {
    switch (field.type) {
        case "input":
            return <InputField field={field} formik={formik} />;

        case "textarea":
            return <TextAreaField field={field} formik={formik} />;

        case "radio":
            return <RadioField field={field} formik={formik} />;

        case "multiselect":
            return (
                <MultiChoiceField
                    formik={formik}
                    name={field.id as never }
                    label={field.label}
                    options={field.options || []}
                />
            );

        case "select":
            return <SelectField field={field} formik={formik} />;

        default:
            return null;
    }
}