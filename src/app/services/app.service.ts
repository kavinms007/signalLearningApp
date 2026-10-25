import { inject, Injectable } from "@angular/core";
import { Product } from "../models/common.model";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AppService{

  httpClient = inject(HttpClient)

   async loadProductsData():Promise<Product[]>{
   const resp =  await fetch('https://dummyjson.com/products')
     return Promise.resolve(resp.json());
    }

 async  loadProductsDataWithHttp():Promise<any>{
    const resp = await this.httpClient.get('https://dummyjson.com/products');
    const returnValue = firstValueFrom(resp)
    return returnValue
   } 

}