import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
register: boolean = false;
isLoading = false;

selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

image!: File;
username: string = '';
password: string = '';
name: string = '';
surname: string = '';
email: string = '';

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

ngOnInit(): void {}

changeToLogin() {
  this.register = false;
}

changeToSignup() {
  this.register = true;
}

registra(form: NgForm): void {
  if (form.invalid) {
    return;
  }

  const formData = new FormData();
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }
  formData.append('nome', form.value.nome);
  formData.append('cognome', form.value.cognome);
  formData.append('username', form.value.username);
  formData.append('email', form.value.email);
  formData.append('password', form.value.password);

  this.http.post('http://localhost:3001/auth/register', formData).subscribe(
    (response) => {
      console.log('Registrazione riuscita', response);
      this.router.navigate(['/login']);
      alert('Registrazione effettuata con successo, ora puoi effettuare il Login');
      this.register = false;
      this.isLoading = false;
    },
    (error) => {
      console.error('Errore durante la registrazione', error);
      // Gestisci l'errore in base alle tue esigenze
      this.isLoading = false;
    }
  );
}

Accedi(): void {
  this.authService.login(this.email, this.password).subscribe(
    (response) => {
      // Login effettuato con successo
      const token = this.authService.getToken();
      console.log('Token:', token); // Verifica il token nella console

      this.router.navigate(['/home']);
      console.log('Login effettuato:', response);
    },
    (error) => {

      console.error('Errore di login:', error);
    }
  );
}

}
