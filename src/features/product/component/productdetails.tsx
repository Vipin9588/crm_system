import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getProductById from "../api/getProductById";
import { checkStatus } from "../api/getProducts";
import type { productDatatype } from "../productStructer";
import { useAuth } from "../../../Context/Authcontext/AuthProvider";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<productDatatype | null>(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        if (!id || !user?.uid) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const data = await getProductById(id, user.uid);


                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, user]);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                Loading...
            </section>
        );
    }

    if (!product) {
        return (
            <section className="min-h-screen p-6">
                <p>Product not found.</p>

                <button
                    className="mt-4 border rounded-md px-4 py-2"
                    onClick={() => navigate("/products")}
                >
                    Back
                </button>
            </section>
        );
    }

    const image = product.images?.[0];
    const imageSrc =
        typeof image === "string" ? image : image?.preview;

    const stockStatus = checkStatus(Number(product.stock));

    return (
        <section className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">

                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => navigate("/products")}
                        className="border px-4 py-2 rounded-md"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={() => navigate(`/editProduct/${product.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Edit Product
                    </button>
                </div>

                <div className="border rounded-md p-6 flex gap-6">

                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={product.name}
                            className="h-40 w-40 object-cover rounded-md"
                        />
                    ) : (
                        <div className="h-40 w-40 bg-gray-200 rounded-md" />
                    )}

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {product.name}
                        </h1>

                        <p>{product.brand}</p>

                        <span
                            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm
                                ${
                                    stockStatus === "In Stock"
                                        ? "bg-green-100 text-green-700"
                                        : stockStatus === "Low Stock"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {stockStatus}
                        </span>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <p>Category</p>
                                <p>{product.category}</p>
                            </div>

                            <div>
                                <p>Stock</p>
                                <p>{product.stock}</p>
                            </div>

                            <div>
                                <p>Cost Price</p>
                                <p>₹{product.costPrice}</p>
                            </div>

                            <div>
                                <p>Sale Price</p>
                                <p>₹{product.salePrice}</p>
                            </div>

                            <div>
                                <p>Discount</p>
                                <p>{product.discount}</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p>Description</p>
                            <p>{product.description}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}