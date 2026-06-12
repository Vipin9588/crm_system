import { Field } from "formik";
import { FormField } from "../form";
import type { FormikProps } from "formik";
import { productDatatype } from "../../productStructer";
type Props = {
    field: FormField;
    formik: FormikProps<productDatatype>;
};

export default function InputField({ field, formik }: Props) {
    return (
        <div className="space-y-2">
            <label className="font-medium">
                {field.label}
            </label>

            <input
                name={`attribute.${field.id}`}
                placeholder={field.placeholder}
                className="w-full border rounded-md p-2"
                value={formik.values.attribute[field.id] || ""}
                onChange={formik.handleChange}
            />
        </div>
    );
}