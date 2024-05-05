import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {
  parseAndValidateInputAndOutputOptions
} from "@angular/compiler-cli/src/ngtsc/annotations/directive/src/input_output_parse_options";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup ;


  constructor(private fb : FormBuilder,
              private router: Router,
              private authService : AuthService) {
  }
  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }

  handleLogin(){
    let username = this.formLogin.value.username ;
    let password = this.formLogin.value.password ;

    this.authService.login(username, password).subscribe({
      next: (user:any) => {
        let userPassword = btoa(user.password) ; //to decode it using base64 decoder

        this.authService.authenticateUser(user) ;
      },
      error: err => {
        console.log(err)
      }
    })
    if(this.formLogin.value.username === "admin" && this.formLogin.value.password=="1234"){
      this.router.navigateByUrl("/admin")
    }
  }

}
