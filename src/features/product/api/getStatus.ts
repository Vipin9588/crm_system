import countDoc from "@/services/countDoc";

type CategoryType = {
  name: string;
  productcount: number;
};

interface Status {
  categories: CategoryType[];
  totalProducts: number;
  lowStock: number;
  inventoryValue: number;
  products: any[];
}

const getProductStats = async (
  userId: string
): Promise<Status | undefined> => {
  try {
    const list = await countDoc<any>(userId, "Products");

    const categoryMap: Record<string, number> = {};

    const stats: Status = {
      categories: [],
      totalProducts: 0,
      lowStock: 0,
      inventoryValue: 0,
      products: list,
    };

    list.forEach((product) => {
      // Total products
      stats.totalProducts++;

      // Inventory value
      stats.inventoryValue +=
        Number(product.stock || 0) *
        Number(product.costPrice || 0);

      // Low stock count
      if (Number(product.stock) < 25) {
        stats.lowStock++;
      }

      // Category count
      const category = product.category || "Uncategorized";

      categoryMap[category] =
        (categoryMap[category] || 0) + 1;
    });

    // Convert object into array
    stats.categories = Object.entries(categoryMap).map(
      ([name, productcount]) => ({
        name,
        productcount,
      })
    );

    return stats;
  } catch (error) {
    console.error("Error fetching product stats:", error);
  }
};

export default getProductStats;