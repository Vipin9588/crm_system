import { productDatatype } from "../../productStructer";
import { FormField } from "../form";
import { FormikProps } from "formik";
type Props = {
    field: FormField;
    formik: FormikProps<productDatatype>
};

export default function RadioField({
    field,
    formik
}: Props) {
    return (
        <div className="space-y-2">
            <label className="font-medium">
                {field.label}
            </label>

            <div className="flex gap-4">
                {field.options?.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="radio"
                            name={`attribute.${field.id}`}
                            value={formik.values.attribute[field.id]}

                        />

                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}