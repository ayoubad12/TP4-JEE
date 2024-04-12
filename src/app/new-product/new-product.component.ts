import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Product} from "../products/Product";
import {ProductService} from "../services/product.service";
import {resolve} from "@angular/compiler-cli";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  public productForm! : FormGroup
  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0),
      checked: this.fb.control(false),
      // You can also specify validators here, e.g., Validators.required
    });
  }

  submitProduct(){
    let newProduct:Product = this.productForm.value ;

    this.productService.saveProduct(newProduct).subscribe({
      next: (response)=>{
        console.log("product added successfully", response);
      },
      error: (error)=>{
        console.error("error adding the product");
      }
    })


  }
}
