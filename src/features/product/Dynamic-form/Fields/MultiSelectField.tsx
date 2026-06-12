import { FormikProps } from "formik";

type Option = {
    label: string;
    value: string;
};

type Props<T, K extends keyof T> = {
    name: T[K] extends string[] ? K : never;
    label: string;
    options: Option[];
    formik: FormikProps<T>
};

export default function MultiSelectField<T, K extends keyof T>({
    name,
    label,
    options,
    formik
}: Props<T, K>) {



    const selectedValue: string[] = (formik.values[name]) as string[] || [];

    const handleChange = (value: string) => {
        const isSelected = selectedValue.includes(value);
        if (isSelected) {
            const updated = selectedValue.filter((value) => (value !== value));
            formik.setFieldValue(name as string, updated);
        }
        else {
            formik.setFieldValue(name as string, [...selectedValue, value]);
        }
    }

    return (
        <div className="space-y-2">
            <h3>{label}</h3>

            <div className="flex gap-2 flex-wrap">
                {options.map((option) => {

                    const isActive = selectedValue.includes(option.value)

                    return <button
                        type="button"
                        key={option.value}
                        className={`border rounded-md px-4 py-2 
                                 ${isActive ? "bg-black text-white"
                                : ""}
                            }`}

                        onClick={() => { handleChange(option.value) }}

                    >
                        {option.label}
                    </button>
                })}
            </div>
        </div>
    );

}