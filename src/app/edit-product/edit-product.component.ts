import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class  EditProductComponent implements OnInit{
  productId! :number;

  constructor(private activatedRoute:ActivatedRoute,
              private  productService:ProductService) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'] ; //to capture the id in route
    // this.productService = this.productService.getProductById(this.productId) ;
  }
}
