import { Button } from "@/Components/ui/button"
import Filter from "@/Components/ui/filter"
import { Input } from "@/Components/ui/input"
import { useNavigate } from "react-router-dom"
const list = ["Elec", "Plastic", "clothes"]
export default function ProductListHeader() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-3  ml-2 mr-2 rounded-lg border bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <Button className="flex" onClick={() => navigate("/addProduct")}>
                <span className="text-[20px]">+</span>
                <span className="text-sm-font">Add Product</span>
            </Button>

            <div className="flex gap-2">
                <div className="relative">
                    <Input
                        className="w-64 pl-9"
                        placeholder="Search products..."
                    />
                </div>

                <Filter filterList={list} />
            </div>
        </div>
    )
}
