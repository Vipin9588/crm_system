import { useFormik } from "formik";

export type ProductType = {
    brand: string;
    category: string;
    costPrice: string;
    createdAt: string;
    description: string;
    discount: string;
    gender: string[];
    image: string[];
    name: string;
    salePrice: string;
    size: string[];
    stock: string;
    userId: string;
};

const initialValues = {
    brand: "",
    category: "",
    costPrice: "",
    createdAt: "",
    description: "",
    discount: "",
    gender: [],
    image: [],
    name: "",
    salePrice: "",
    size: [],
    stock: "",
    userId: "",
}

export default function ProductFormHandle() {

    const ProductFormik = useFormik<ProductType>({
        initialValues,
        onSubmit: (values) => {
            console.log("this is the value --> ", values)

            alert(JSON.stringify(values, null, 2));
        },
    });

    const inputFiled = (filed: keyof ProductType) => {
        return ProductFormik.values[filed]
    }

    return { ProductFormik, handleChange: ProductFormik.handleChange, inputFiled };
}
