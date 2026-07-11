 import { db } from "../../../config/firebase"; 
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Customer } from "../types";

async function findCustomerDoc(userId: string, customerId: string) {
  const q = query(
    collection(db, "Customers"),
    where("userId", "==", userId),
    where("customerId", "==", customerId)
  );
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0];
}

export async function getCustomerById(
  userId: string,
  customerId: string
): Promise<Customer | null> {
  const docSnap = await findCustomerDoc(userId, customerId);
  return docSnap ? (docSnap.data() as Customer) : null;
}

export async function updateCustomer(
  userId: string,
  customerId: string,
  updates: Partial<Customer>
): Promise<void> {
  const docSnap = await findCustomerDoc(userId, customerId);
  if (!docSnap) throw new Error(`Customer ${customerId} not found`);
  await updateDoc(docSnap.ref, updates);
}

export async function deleteCustomer(userId: string, customerId: string): Promise<void> {
  const docSnap = await findCustomerDoc(userId, customerId);
  if (!docSnap) throw new Error(`Customer ${customerId} not found`);
  await deleteDoc(docSnap.ref);
}