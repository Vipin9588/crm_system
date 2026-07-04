import {db} from "@/config/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Order } from "@/features/Order/api/orderStatus";

async function findOrderDoc(userId: string, orderId: string) {
  const q = query(
    collection(db, "Orders"),
    where("userId", "==", userId),
    where("orderId", "==", orderId)
  );
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0];
}

export async function getOrderById(userId: string, orderId: string): Promise<Order | null> {
  const docSnap = await findOrderDoc(userId, orderId);
  return docSnap ? (docSnap.data() as Order) : null;
}

export async function updateOrder(
  userId: string,
  orderId: string,
  updates: Partial<Order>
): Promise<void> {
  const docSnap = await findOrderDoc(userId, orderId);
  if (!docSnap) throw new Error(`Order ${orderId} not found`);
  await updateDoc(docSnap.ref, updates);
}

export async function updateOrderStatus(
  userId: string,
  orderId: string,
  status: Order["status"]
): Promise<void> {
  await updateOrder(userId, orderId, { status });
}

export async function deleteOrder(userId: string, orderId: string): Promise<void> {
  const docSnap = await findOrderDoc(userId, orderId);
  if (!docSnap) throw new Error(`Order ${orderId} not found`);
  await deleteDoc(docSnap.ref);
}