import countDoc from "@/services/countDoc";
import { object } from "zod";
import Product from "../component/Product";

interface status {
    categories:string[],
    totalProducts:number,
    lowStock:number,
    inventeryValue:number,
    products: any[]
}


const getProductStats = async(userId:string)=>{
     try {
     let obj = {
    categories:[],
    totalProducts:0,
    lowStock:0,
    inventeryValue:0,
    products: []
     }
       const list = await countDoc<any>(userId,"Products")
       const categories = list.map((p,i)=>{
         obj.categories.push(p?.category);
         obj.totalProducts+=1;
         obj.inventeryValue+=(p.stock *p.costPrice);
         if(p.stock < 25){
          obj.lowStock +=1
         }
       });
       
      obj.products = list;

      return obj
      

     } catch (error) {
        
     }
}

export default getProductStats