import Filter from "@/Components/ui/filter";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";

export default function OrderHeader() {
  const list = ["Elec", "Clothes", "Toys", "Grocery"];

  return (
    <div className="mt-4 rounded-2xl border bg-card shadow-sm sm:mx-4">
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            All Orders
          </button>

          <button className="rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Paid
          </button>

          <button className="rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Unpaid
          </button>

          <button className="rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Completed
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            84 Orders
          </span>
        </div>
      </div>

      <div className="border-t" />

      <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Search orders..."
            className="pl-10"
          />
        </div>

        <div className="w-full lg:w-auto">
          <Filter filterList={list} />
        </div>
      </div>
    </div>
  );
}