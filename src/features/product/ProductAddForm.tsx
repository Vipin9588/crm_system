import ProductSize from "./ProductSize";
import { Pattern } from "./ProductDropDown";

export default function ProductAddForm() {
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

        <form className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
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
                    placeholder="Enter product name"
                    className="w-full h-11 border bg-background rounded-md px-4"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Enter product description"
                    className="w-full border rounded-xl bg-background p-4 resize-none"
                  />
                </div>
              </div>
            

            {/* Size & Gender */}
            <div className="p-6 ">
              <div className="grid md:grid-cols-2 gap-8 ">
                <div>
                  <h3 className="font-medium mb-2">Size</h3>

                  <p className="text-sm text-slate-500 mb-4">
                    Pick Available Size
                  </p>

                  <ProductSize />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Gender</h3>

                  <p className="text-sm text-slate-500 mb-4">
                    Pick Available Gender
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {["Male", "Female", "Unisex"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={item}
                          className="accent-green-500"
                        />

                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
     </div>
            {/* Pricing */}
            <div className="bg-background rounded-md border p-6 shadow-sm">
              <h2 className="font-semibold mb-5">
                Pricing & Stock
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    Cost Price
                  </label>

                  <input
                    type="number"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Sell Price
                  </label>

                  <input
                    type="number"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Stock
                  </label>

                  <input
                    type="number"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Discount
                  </label>

                  <input
                    type="number"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>
              </div>
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
                <Pattern />
              </div>
            </div>
            <div className="bg-background rounded-md border p-6 ">
               <div>
                  <label className="block mb-2">
                    Product Category
                  </label>

                  <input
                    type="text"
                    placeholder="Select category"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2">
                    Brand
                  </label>

                  <input
                    type="text"
                    placeholder="Brand name"
                    className="w-full h-11 border rounded-md px-4"
                  />
                </div>        
            </div>                

          </div>
        </form>
      </div>
    </section>
  );
}