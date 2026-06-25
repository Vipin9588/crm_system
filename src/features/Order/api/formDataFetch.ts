import countDoc from "@/services/countDoc";

const getCustomers = async (userId: string) => {
    try {
        const customers = await countDoc<any>(userId, "Customers");
        const products = await countDoc<any>(userId, "Orders");
        const customerData = customers.map((cus)=>{
            return {
               id:cus?.id,
               email:cus?.email,
               name:cus?.name
            }
        });

        const productData = products.map((pr)=>{
            return {
                id:pr?.id,
                name:pr?.name,
                price:pr?.salePrice,
                stock:pr?.stock
            }
        });

    } catch (error) {
      console.error(error)
    }
}