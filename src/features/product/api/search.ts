import { productDatatype } from "../productStructer"
import getProducts from "./getProducts";
export const search = async (
    userId: string,
    term: string = "",
) => {
    const list = await getProducts(userId);
    console.log("this is called...")
    if (!term) return list;

    return list.filter((item) =>
        JSON.stringify(item)
            .toLowerCase()
            .includes(term.toLowerCase())
    );
};