import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { productDatatype } from "../productStructer";

const getProducts = async (userId: string): Promise<productDatatype[]> => {
    try {
        const productsRef = collection(db, "Products");

        const q = query(productsRef, where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as productDatatype[];


        return products;
    } catch (error) {
        console.log("Error fetching products:", error);
        return []
    }
};


export default getProducts;


// check Status 

export const checkStatus = (value: number) => {
    switch (true) {
        case (value < 70 && value > 20):
            return "Low Stock"

        case (value === 0):
            return "Out of Stock"

        default:
            return "In Stock"

    }
}