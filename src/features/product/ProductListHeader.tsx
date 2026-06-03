import { Button } from "@/Components/ui/button"
import Filter from "@/Components/ui/filetr"
import { Input } from "@/Components/ui/input"
const list = ["Elec", "Plastic", "clothes"]
export default function ProductListHeader() {
    return (
        <div className="flex flex-col gap-3  ml-2 mr-2 rounded-lg border bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <Button className="gap-2">
                <span className="text-lg">+</span>
                Add Product
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
