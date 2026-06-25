import type { Customer } from "../types";
import countDoc from "@/services/countDoc";
 
export const getCustomerStaus = async (userId: string) => {
    try {
        const customers = await countDoc<Customer>(userId,"Customers");
        return customers;
    } catch (error) {
        console.error(error);
        return [];
    }
};