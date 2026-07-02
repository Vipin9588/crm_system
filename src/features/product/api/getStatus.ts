import getProducts from "./getProducts";

type CategoryType = {
  name: string;
  value: number;
};
 type analytic = {
   month:string,
   productsAdded:number
 }

export  interface Status {
  categories: CategoryType[];
  totalProducts: number;
  lowStock: number;
  inventoryValue: number;
  products: any[];
  monthlyAnalytic:analytic[]
}

const getProductstatus = async (
  userId: string
): Promise<Status | undefined> => {
  try {

    const list = await getProducts(userId);

    const categoryMap: Record<string, number> = {};
    const monthMap: Record<string, number> = {};
    const status: Status = {
      categories: [],
      totalProducts: 0,
      lowStock: 0,
      inventoryValue: 0,
      products: list,
      monthlyAnalytic:[]
    };

    list.forEach((product) => {
  status.totalProducts++;

  status.inventoryValue +=
    Number(product.stock || 0) *
    Number(product.costPrice || 0);

  if (Number(product.stock) < 25) {
    status.lowStock++;
  }

  const category = product.category || "Uncategorized";

  categoryMap[category] =
    (categoryMap[category] || 0) + 1;

  if (product.createdAt) {
    const date = new Date(product.createdAt);

    const monthYear = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }); 

    monthMap[monthYear] =
      (monthMap[monthYear] || 0) + 1;
  }
});
    status.categories = Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    status.monthlyAnalytic = Object.entries(monthMap).map(([ month,productsAdded])=>({
      month,
      productsAdded
    }))


    return status;
  } catch (error) {
    console.error("Error fetching product status:", error);
  }
};

export default getProductstatus;