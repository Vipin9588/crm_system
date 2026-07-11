import { db } from "../../../config/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
} from "firebase/firestore";

// Delete product by product.id field and userId
const deleteProduct = async (
    productId: string,
    userId: string
): Promise<boolean> => {
    try {
        const q = query(
            collection(db, "Products"),
            where("id", "==", productId),
            where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("Product not found or unauthorized.");
            return false;
        }

        const productDoc = querySnapshot.docs[0];
        await deleteDoc(productDoc.ref);

        console.log("Product deleted successfully:", productId);

        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};

export default deleteProduct;