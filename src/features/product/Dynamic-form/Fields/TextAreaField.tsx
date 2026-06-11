import { FormikProps } from "formik";
import { FormField } from "../form";
import { productDatatype } from "../../productStructer";

type Props = {
    field: FormField;
    formik: FormikProps<productDatatype>
};

export default function TextAreaField({
    field,
    formik
}: Props) {
    return (
        <div className="space-y-2">
            <label className="font-medium">
                {field.label}
            </label>

            <input
                type="textarea"
                name={`atribute.${field.id}`}
                placeholder={field.placeholder}
                className="w-full border rounded-md p-2 min-h-[120px]"
                onChange={formik.handleChange}
            />
        </div>
    );
}