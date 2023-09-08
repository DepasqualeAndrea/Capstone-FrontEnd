import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  register: boolean = false;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  changeToLogin(){
    this.register = false;
  }
  changeToSignup() {
    this.register = true;
  }

  registra(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
        this.authService.signup(form.value).subscribe();
        this.router.navigate(['/login']);
        this.isLoading = false
    } catch (error: any) { // Cast error to any type
        console.error(error);
        if (error.status == 400) {
            alert('Email già registrata!');
            this.router.navigate(['/register']);
        }
        this.isLoading = false
    }
}

accedi(form: NgForm) {
  this.isLoading = true;
  console.log(form.value);
  try {
      this.authService.login(form.value).subscribe();
      this.isLoading = false;
      alert('Login effettuato!');
      this.router.navigate(['/home']);
  } catch (error) {
      this.isLoading = false;
      alert('Login sbagliato!');
      console.error(error);
  }
}

}
