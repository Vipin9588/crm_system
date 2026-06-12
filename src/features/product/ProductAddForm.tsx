import { Pattern } from "./ProductDropDown";
import React, { useEffect, useRef, useState } from "react";
import Category, { searchCategory } from "./Category";
import DynamicField from "./Dynamic-form/DynamicField";
import { categoryConfigs } from "@/config/categoryConfigs"
import { productCategories } from "@/config/categoryConfigs";
import { useFormik } from "formik";
import { productDatatype } from "./productStructer";
import { file } from "zod";
import { uploadImageToCloudinary } from "@/services/cloudnairy";
export default function ProductAddForm() {

  const [categoryList, setCategoryList] = useState<string[] | null>([]);
  const [openDrop, setDrop] = useState(false);
  const [selectedCategory, setCategory] = useState<string>("Clothing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const ref = useRef<HTMLDivElement | null>(null);
  const categorySearch = (e: React.ChangeEvent<HTMLInputElement>, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
    searchCategory(e, productCategories, setCategoryList, timeoutRef, handleChange);
  }

  const formik = useFormik<productDatatype>({
    initialValues: {
      name: "",
      brand: "",
      description: "",
      category: "",
      costPrice: "",
      salePrice: "",
      discount: "",
      stock: "",
      images: [],
      attribute: {

      }
    },
    onSubmit: async (values) => {
      try {
        console.log(values);

        const imageUrls = await Promise.all(
          values.images.map((img) => {
            console.log("uploading image:", img);
            return uploadImageToCloudinary(img.file);
          })
        );

        console.log("Uploaded URLs:", imageUrls);

        // Save to Firebase here
        // await addDoc(collection(db, "products"), {
        //   ...values,
        //   image: imageUrls,
        // });

      } catch (error) {
        console.error("Image upload failed:", error);

        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  })



  useEffect(() => {

    const handleCloseDropOutsideClick = (
      e: MouseEvent,
    ) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDrop(false)
      }
    };

    document.addEventListener("click", handleCloseDropOutsideClick);

    return () => {
      document.removeEventListener("click", handleCloseDropOutsideClick)
    }

  }, [])




  return (
    <section className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-md-font font-semibold">
            Add New Product
          </h1>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-5 py-2 border rounded-md bg-background text-foreground"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-primary text-white "
            >
              Add Product
            </button>
          </div>
        </div>

        <form className="grid lg:grid-cols-[2fr_1fr] gap-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className="bg-background rounded-md border p-6  flex items-center gap-4">
              <div ref={ref} className=" w-[50%]">
                <label className="block mb-2">
                  Product Category
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="Select category"
                  className="w-full h-11 border rounded-md px-4 "
                  value={formik.values.category}
                  onFocus={() => setDrop(true)}
                  onChange={(e) => {
                    categorySearch(
                      e,
                      formik.handleChange
                    )
                  }
                  }
                />
                {openDrop && <Category categoryList={categoryList} setCategory={setCategory} setopenDrop={setDrop} setFieldValue={formik.setFieldValue} />}
              </div>

              <div className="w-[50%]">
                <label className="block mb-2">
                  Brand
                </label>


                <input
                  type="text"
                  name="brand"
                  placeholder="Brand name"
                  className="w-full h-11 border rounded-md px-4"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                />
              </div>

            </div>
            {/* Pricing */}
            <div className="bg-background rounded-md border p-6 shadow-sm">
              <h2 className="font-bold mb-5">
                General Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm-font font-medium">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    className="w-full h-11 border bg-background rounded-md px-4"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    name="description"
                    placeholder="Enter product description"
                    className="w-full border rounded-xl bg-background p-4 resize-none"
                    value={formik.values.description}
                    onChange={formik.handleChange}

                  />
                </div>
              </div>
              {categoryConfigs[selectedCategory].map((field) => (
                <DynamicField
                  formik={formik}
                  key={field.id}
                  field={field}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Category */}
            <div className="bg-background rounded-md border p-6 shadow-sm">
              <h2 className="font-semibold mb-5">
                Upload Image
              </h2>

              <div className="space-y-4">
                <Pattern onFilesChange={(file) => {
                  console.log("this is the file uploding message", file)
                  formik.setFieldValue("images", file)
                }} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">
                  Cost Price
                </label>

                <input
                  type="number"
                  name="costPrice"
                  className="w-full h-11 border rounded-md px-4"
                  value={formik.values.costPrice}
                  onChange={formik.handleChange}

                />
              </div>

              <div>
                <label className="block mb-2">
                  Sell Price
                </label>

                <input
                  type="number"
                  name="salePrice"
                  className="w-full h-11 border rounded-md px-4"
                  value={formik.values.salePrice}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label className="block mb-2">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="w-full h-11 border rounded-md px-4"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label className="block mb-2">
                  Discount
                </label>

                <input
                  type="number"
                  name="discount"
                  className="w-full h-11 border rounded-md px-4"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </section>
  );
}