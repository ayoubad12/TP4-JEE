import {Component, numberAttribute, OnInit} from '@angular/core';
import {Product} from "./Product";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products: Product[] ;
  public keyword: string = "" ;

  //pagination properties:
  public nbrPrages:number = 1;
  public currentPage:number =1;
  public iterationArray = new Array(this.nbrPrages);




  constructor(private productService: ProductService,
              private router:Router) {  this.products = [] }

  ngOnInit():void{
    this.getProducts();
  }

  getProducts(page:number=1): void{
    this.productService.getProduct(page).subscribe({
      next: (response) => {
        this.nbrPrages = response.pages ;
        this.currentPage = response.prev+1 ;
        this.products = response.data ;
        this.iterationArray = new Array(this.nbrPrages);


      },
      error: (error) => {
        console.error('error fetching products', error)
      },
      complete: () => {
        console.log("done fetching products!")
      }
    });
  }

  setChecked(productId:string) : void {
    let product = this.products.find(p=>p.id === productId)
    if(product) {
      product.checked = !product.checked;
      this.productService.checkProduct(product).subscribe({
        next: (response : Product) => {
          console.log('product updated successfully:', response); // for debugging
        },
        error: (error) => {
          console.error(`error updating product with id:${productId}`, error)
        }
      });
    }
  }

  deleteProduct(productId:String) : void{
    if(confirm(`are you sure you want to delete product with id: ${productId}`)) {
      // delete the product from the client side
      this.products = this.products.filter((pdt) => pdt.id !== productId);
      // Send a request to delete the product from the server
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          console.log("deleted product:", response);
        },
        error: (error) => {
          console.error("error deleting product:", error)
        }
      })
    }
  }

  searchProduct():void{
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.products = response.data.filter(product => product.name.toLowerCase().includes(this.keyword.toLowerCase()) );
        // console.log(`searched about ${this.keyword} and got:`, this.products ) // for debugging
      },
      error: (error) => {
        console.error('error fetching products', error)
      }
    });
  }

  handleEdit(product:Product):void {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
