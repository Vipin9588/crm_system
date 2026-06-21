import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


const countDoc = async <T>(
  userId: string,
  collName: string
): Promise<T[]> => {
  try {
    const docRef = collection(db, collName);
    const q = query(docRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export default countDoc;