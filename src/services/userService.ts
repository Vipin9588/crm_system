import { addDoc, collection,doc, updateDoc ,deleteDoc,DocumentData} from "firebase/firestore";
import { db } from "../config/firebase";


export interface Product {
  userId: string;
  brand: string;
  category: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  description: string;
  discount: number;
  gender: string[];
  image: string[];
  name: string;
  size: string[];
 
}



export async function AddToCollection<T extends DocumentData>(collectionName:string,data:T) {
  try {
    const docRef = await addDoc(
      collection(db,collectionName),
      data
    );

    return docRef.id;
  } catch (error) {
    throw error;
  }
}


export async function editProduct(
  productId: string,
  updatedData: object
) {
  try {
    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, updatedData);

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId: string) {
  try {
    const productRef = doc(db, "products", productId);

    await deleteDoc(productRef);

  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}