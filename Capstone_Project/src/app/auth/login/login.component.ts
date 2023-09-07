import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  register: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  changeToLogin(){
    this.register = false;
  }
  changeToSignup() {
    this.register = true;
  }
}
