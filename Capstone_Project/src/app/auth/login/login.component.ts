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

password: string = '';
email: string = '';

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

ngOnInit(): void {

}

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
      this.isLoading = false;
    }
  );
}

Accedi(): void {
  this.authService.login(this.email, this.password).subscribe(
    (response) => {
      const token = this.authService.getToken();
      console.log('Token:', token);
      alert('Login effettuato con successo ✅')
      this.router.navigate(['/home']);
    },
    (error) => {
      alert('⛔ Credenziali non valide Verifica che le credenziali di accesso sia corrette e riprova ad effettuale l\'accesso')
      console.error('Errore di login:', error);
    }
  );
}

}
