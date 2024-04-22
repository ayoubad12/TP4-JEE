import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public appState : AppStateService,
              public loadingService: LoadingService) {}

  currentAction : string = "Home" ;
  title = 'enset-app' ;
  actions : Array<any> = [
    {name:"Home", path:"/home" ,icon:"bi-house"},
    {name:"Products", path:"/products", icon:"bi-box"},
    {name:"New Product", path:"/newProduct" , icon:"bi-plus-circle"}
  ];


  public setAction(action : string) : void {
    this.currentAction = action ;
  }
}
