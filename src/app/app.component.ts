import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentAction : string = "Home" ;
  title = 'enset-app' ;
  actions : Array<any> = [{name:"Home", path:"/home" ,icon:"bi-house"},
                          {name:"Products", path:"/products", icon:"bi-box"},
                          {name:"New Product", path:"/newProduct" , icon:"bi-plus-circle"}];


  public setAction(action : string) : void {
    this.currentAction = action ;
  }
}
