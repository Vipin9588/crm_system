import { FormikProps } from "formik";
import { productDatatype } from "../../productStructer";

type Option = {
    label: string;
    value: string;
};

type Props = {
    name: string;
    label: string;
    options: Option[];
    formik: FormikProps<productDatatype>
};

export default function MultiSelectField({
    name,
    label,
    options,
    formik
}: Props) {




    return (
        <div className="space-y-2">
            <h3>{label}</h3>

            <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.value}
                        className={`border rounded-md px-4 py-2 
                            ? "bg-black text-white"
                            : ""
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}