import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductApiResponse} from "../products/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8089"
  constructor(private http : HttpClient){}

  public getProduct(page: number = 1, size: number=4):Observable<ProductApiResponse>{
    return this.http.get<ProductApiResponse>(`${this.host}/products?_page=${page}&_per_page=${size}`) ;
  }

  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${parseInt(product.id)}`, {checked:product?.checked})
  }

  public deleteProduct(productId:String):Observable<void>{
    return this.http.delete<void>(`${this.host}/products/${productId}`);
  }

  public saveProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.host}/products/`, product) ;
  }

  // public searchProducts(keyword:String):Observable<Product[]>{
  //   return this.http.get<Product[]>(`http://localhost:8089/products?name_like=${keyword}`); // not working anymore
  // }

  public getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`)
  }

  public updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }

}
