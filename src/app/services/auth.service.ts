import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,
              private appStateService:AppStateService) {}

  async login(username: String, password: String){
    let user:any = await firstValueFrom(this.http.get("http://localhost:8089/users/" + username));
    let decodeJwt:any = jwtDecode(user.token);
    if(password == btoa(user.password)){
      this.appStateService.setAuthState({
        username : decodeJwt.sub,
        roles : decodeJwt.roles,
        isAuthenticated: true ,
        token: user.token
      })
      return Promise.resolve(true);
    }else{
      return Promise.reject("Bad credentials")
    }
  }
}
