import type { UserCredential } from "firebase/auth";
import { getAdditionalUserInfo, deleteUser } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { captureRejectionSymbol } from "events";
//check New or old user after google sign in and get the user info
type MessageType = (message: string, type: "success" | "error" | "info") => void

type userInfoType = {
   credential: UserCredential;
   toastMessage: MessageType
}

type userScheme = {
   userId: string,
   email: string,
   createdAt: string
}

const checkEmail = (user: userScheme, toastMessage: MessageType) => {
   if (!user.email.endsWith("@gmail.com")) {
      toastMessage("Enter Valid Email", "error");
   };
}



export const checkNewOrOldUser = async ({ credential, toastMessage }: userInfoType): Promise<boolean> => {
   const additionalUserInfo = getAdditionalUserInfo(credential);
   if (additionalUserInfo?.isNewUser) {
      let dl = await deleteUser(credential.user);
      toastMessage("Your account is not registered with us. Please contact the administrator.", "error");
      return true;
   }
   toastMessage("Login successful!", "success");
   return false;
}

export const addUser = async (user: userScheme, toastMessage: MessageType) => {
   let result = await setDoc(doc(db, "Users", "jcsbxozSG1WUUTfxif7I44"), user);
   toastMessage("signup successfull", "success")
   console.log("result is stored in the firestore = ", result);
}

export const getAllUsers = async () => {
   try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const users = querySnapshot.docs.map((doc) => ({
         data: doc.id,
         ...doc.data()

      }));
      return users

   } catch (error) {
      throw error;
   }
};