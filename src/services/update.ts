import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function updateProductInCollection(
  collectionName: string,
  productId: string, // this is the value in the product's `id` field, not the Firestore doc ID
  userId: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const q = query(
      collection(db, collectionName),
      where("id", "==", productId)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      console.error(
        `[updateProductInCollection] No document found with id field = ${productId}`
      );
      return false;
    }

    const docSnap = snap.docs[0];
    const product = docSnap.data();

    if (product.userId !== userId) {
      console.error(
        `[updateProductInCollection] Ownership mismatch. stored userId="${product.userId}" vs passed userId="${userId}"`
      );
      return false;
    }

    await updateDoc(docSnap.ref, data);
    return true;
  } catch (error) {
    console.error("[updateProductInCollection] updateDoc threw:", error);
    return false;
  }
}