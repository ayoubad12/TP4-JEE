import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductApiResponse} from "../products/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http : HttpClient){}

  public getProduct(page: number = 1, size: number=4):Observable<ProductApiResponse>{
    return this.http.get<ProductApiResponse>(`http://localhost:8089/products?_page=${page}&_per_page=${size}`) ;
  }

  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${parseInt(product.id)}`, {checked:product?.checked})
  }

  public deleteProduct(productId:String):Observable<void>{
    return this.http.delete<void>(`http://localhost:8089/products/${productId}`);
  }

  public saveProduct(product: Product):Observable<Product>{
    return this.http.post<Product>('http://localhost:8089/products/', product) ;
  }

  // public searchProducts(keyword:String):Observable<Product[]>{
  //   return this.http.get<Product[]>(`http://localhost:8089/products?name_like=${keyword}`); // not working anymore
  // }


}
