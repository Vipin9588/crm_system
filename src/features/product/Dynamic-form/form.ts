export type FieldType =
    | "input"
    | "textarea"
    | "radio"
    | "multiselect"
    | "select";

export interface FormField {
    id: string;
    label: string;
    type: FieldType;

    placeholder?: string;

    options?: {
        label: string;
        value: string;
    }[];
}