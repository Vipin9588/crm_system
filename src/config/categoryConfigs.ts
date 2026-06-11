import { FormField } from "@/features/product/Dynamic-form/form";

// product categories

export const productCategories: string[] = [
    "Electronics",
    "Fashion",
    "Clothing",
    "Footwear",
    "Beauty",
    "Health",
    "Books",
    "Sports",
    "Toys",
    "Furniture",
    "Home Decor",
    "Kitchen",
    "Groceries",
    "Jewelry",
    "Watches",
    "Bags",
    "Automotive",
    "Mobile Phones",
    "Laptops",
    "Gaming",
    "Pet Supplies",
    "Office Supplies",
    "Baby Products",
    "Garden",
    "Appliances",
];



//Input filed
export const categoryConfigs: Record<string, FormField[]> = {
    Electronics: [],

    Fashion: [],

    Clothing: [
        {
            id: "size",
            label: "Size",
            type: "multiselect",
            options: [
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
                { label: "XL", value: "XL" },
            ],
        },
        {
            id: "gender",
            label: "Gender",
            type: "radio",
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Unisex", value: "unisex" },
            ],
        },
    ],

    Footwear: [
        {
            id: "shoeSize",
            label: "Shoe Size",
            type: "multiselect",
            options: [
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
            ],
        },
        {
            id: "gender",
            label: "Gender",
            type: "radio",
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Unisex", value: "unisex" },
            ],
        },
    ],

    Beauty: [
        {
            id: "skinType",
            label: "Skin Type",
            type: "radio",
            options: [
                { label: "Dry", value: "dry" },
                { label: "Oily", value: "oily" },
                { label: "Combination", value: "combination" },
            ],
        },
    ],

    Health: [],

    Books: [
        {
            id: "author",
            label: "Author",
            type: "input",
        },
        {
            id: "language",
            label: "Language",
            type: "input",
        },
    ],

    Sports: [],

    Toys: [],

    Furniture: [
        {
            id: "material",
            label: "Material",
            type: "input",
        },
    ],

    "Home Decor": [],

    Kitchen: [],

    Groceries: [],

    Jewelry: [],

    Watches: [],

    Bags: [],

    Automotive: [],

    "Mobile Phones": [
        {
            id: "storage",
            label: "Storage",
            type: "select",
            options: [
                { label: "64 GB", value: "64" },
                { label: "128 GB", value: "128" },
                { label: "256 GB", value: "256" },
            ],
        },
    ],

    Laptops: [
        {
            id: "ram",
            label: "RAM",
            type: "select",
            options: [
                { label: "8 GB", value: "8" },
                { label: "16 GB", value: "16" },
                { label: "32 GB", value: "32" },
            ],
        },
        {
            id: "storage",
            label: "Storage",
            type: "select",
            options: [
                { label: "256 GB", value: "256" },
                { label: "512 GB", value: "512" },
                { label: "1 TB", value: "1024" },
            ],
        },
    ],

    Gaming: [],

    "Pet Supplies": [],

    "Office Supplies": [],

    "Baby Products": [],

    Garden: [],

    Appliances: [],
};