
type ProductStatus =
    | "In Stock"
    | "Low Stock"
    | "Out of Stock";

export type productProps = {
    img: string,
    name: string,
    brand: string,
    cost: string,
    price: string,
    status: ProductStatus;
}
export default function Product({
    img,
    name,
    brand,
    cost,
    price,
    status,
}: productProps) {
    return (
        <div className="flex items-center gap-4 rounded-lg border p-2  hover:shadow-sm transition-shadow">
            <img
                src={img}
                alt={name}
                className="h-10 w-10 rounded-md object-cover border"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-sm-font">{name}</h3>
                <p className="text-xs text-muted-foreground">
                    {brand}
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm text-muted-foreground">
                    Cost
                </p>
                <p className="font-medium text-xs">
                    ₹{cost.toLocaleString()}
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm text-muted-foreground">
                    Price
                </p>
                <p className="font-medium text-xs">
                    ₹{price.toLocaleString()}
                </p>
            </div>

            <span
                className={`rounded-full px-3 py-1  text-xs font-medium 
                ${status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
            >
                {status}
            </span>
        </div>
    );
}