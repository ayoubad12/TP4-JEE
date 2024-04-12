import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../products/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class  EditProductComponent implements OnInit{
  productId! :number;
  productFormGroup! :FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
              private  productService:ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'] ; //to capture the id in route
    this.productService.getProductById(this.productId).subscribe({
      next:(product)=>{
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id ),
          name: this.fb.control(product.name, Validators.required ),
          price: this.fb.control(product.price),
          checked: this.fb.control(product.checked),
        })
      },
      error: (error)=>{
        console.log(`error getting product with id=${this.productId}`, error) ;
      }
    })
  }

  updateProduct(){
    let product:Product = this.productFormGroup.value ;

    this.productService.updateProduct(product).subscribe({
      next:(response)=>{
        alert(JSON.stringify(response));
      },
      error: (error)=>{
        console.error(`error updating product with id=${product.id}`, error);
      }
    })
  }
}
