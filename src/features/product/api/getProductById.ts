import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import type { productDatatype } from "../productStructer";

const getProductById = async (
  productId: string,
  userId: string
): Promise<productDatatype | null> => {
  try {
    const productsRef = collection(db, "Products");

    const q = query(
      productsRef,
      where("id", "==", productId),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Product not found");
      return null;
    }

    const productDoc: QueryDocumentSnapshot<DocumentData> =
      snapshot.docs[0];

    const product = {
      ...(productDoc.data() as productDatatype),
      firestoreId: productDoc.id,
    };

    console.log("Product:", product);

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default getProductById;


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