import {Component, numberAttribute, OnInit} from '@angular/core';
import {Product} from "./Product";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


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
              private router:Router,
              public appState : AppStateService ) {  this.products = [] }

  ngOnInit():void{
    this.getProducts();
  }

  getProducts(page:number=this.appState.productState.currentPage, size:number=this.appState.productState.pageSize): void{
    // this.appState.setProductState({
    //   status: "LOADING"
    // })
    this.productService.getProduct(page,size).subscribe({
      next: (response) => {
        let products ;
        let totalPages  ;
        let currentPage ;
        let totalProducts ;

        if(this.appState.productState.keyword==""){
          //using shared services
          products=(response.data) ;
          totalPages = response.pages ;
          currentPage = response.prev+1 ;
          totalProducts = response.items ;
        }else {
          products = response.data.filter((product:any) => product.name.toLowerCase().includes(this.appState.productState.keyword.toLowerCase()) );
          totalPages = Math.ceil(this.appState.productState.products.length / size)  ;
          currentPage = 1 ;
          totalProducts = this.appState.productState.products.length ;
        }

        this.appState.setProductState({
          products: products,
          totalPages: totalPages,
          currentPage: currentPage,
          totalProducts: totalProducts,
          // status: "LOADED"
        })


      },
      error: (error) => {
        console.error('error fetching products', error)
        this.appState.setProductState({
          status: "ERROR",
          errorMessage: error
        })
      },
      complete: () => {
        console.log("done fetching products!")
      }
    });
  }

  setChecked(productId:string) : void {
    let product = this.appState.productState.products.find((p:any)=>p.id === productId)
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
      this.appState.productState.products = this.appState.productState.products.filter((pdt:Product) => pdt.id !== productId);
      this.appState.productState.totalProducts-- ;


      // Send a request to delete the product from the server
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          console.log("deleted product:", response);
        },
        error: (error) => {
          console.error("error deleting product:", error);
        }
      })
    }
  }

  // searchProduct():void{
  //   // this.productService.getProduct().subscribe({
  //   //   next: (response) => {
  //   //     this.appState.productState.products = response.data.filter(product => product.name.toLowerCase().includes(this.appState.productState.keyword.toLowerCase()) );
  //   //     // console.log(`searched about ${this.keyword} and got:`, this.products ) // for debugging
  //   //
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('error fetching products', error)
  //   //   }
  //   // });
  //
  // }

  handleEdit(product:Product):void {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
