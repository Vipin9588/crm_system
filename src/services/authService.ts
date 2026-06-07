import type {UserCredential} from "firebase/auth"
import { getAdditionalUserInfo,deleteUser } from "firebase/auth";

//check New or old user after google sign in and get the user info

 type userInfoType = {
    credential:UserCredential;
    toastMessage:(message:string, type:"success" | "error" | "info") =>void
 }

export const  checkNewOrOldUser = async ({credential,toastMessage}:userInfoType):Promise<boolean> => {
     const additionalUserInfo = getAdditionalUserInfo(credential);
        if (additionalUserInfo?.isNewUser) {
            let dl = await deleteUser(credential.user);
            toastMessage("Your account is not registered with us. Please contact the administrator.", "error");
            return true;
        }
        toastMessage("Login successful!", "success");
        return false;
   }
