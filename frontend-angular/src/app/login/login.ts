import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router} from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit{
  public loginForm! : FormGroup;

  constructor(private fb : FormBuilder,
              private authService : Auth,
              private router : Router) {
  }

  ngOnInit(){
     this.loginForm = this.fb.group({
       username : this.fb.control(''),
       password : this.fb.control('')
     });
  }

  login(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth:boolean = this.authService.login(username, password);
    if(auth==true){
      this.router.navigateByUrl("/admin")}
  }
}
