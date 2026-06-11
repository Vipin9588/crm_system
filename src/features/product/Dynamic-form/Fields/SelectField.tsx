import { Field, FormikProps } from "formik";
import { FormField } from "../form";
import { productDatatype } from "../../productStructer";

type Props = {
    field: FormField;
    formik: FormikProps<productDatatype>;
};

export default function SelectField({
    field,
    formik
}: Props) {
    return (
        <div className="space-y-2">
            <label className="font-medium">
                {field.label}
            </label>

            <Field
                as="select"
                name={`attribute.${field.id}`}
                className="w-full border rounded-md p-2"
                value={formik.values.attribute[field.id]}
            >
                <option value="">
                    Select {field.label}
                </option>

                {field.options?.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </Field>
        </div>
    );
}