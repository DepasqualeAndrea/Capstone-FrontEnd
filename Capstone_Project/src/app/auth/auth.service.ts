import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Data } from './data.interface';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService(); // Serve per leggere e validare il token
  baseURL = environment.baseUrl;
  private authSubj = new BehaviorSubject<null | Data>(null); // Serve per comunicare in tempo reale all'applicazione la presenza dell'utente autenticato
  utente!: any;
  private token: string | null = null;
  user$ = this.authSubj.asObservable(); // La variabile di tipo BehaviourSubject che trasmetterà la presenza o meno dell'utente
  timeoutLogout: any;

  constructor(private http: HttpClient, private router: Router, ) {}

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.token;
  }

  getCurrentUserInfo(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3001/user/utente');
  }

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>('http://localhost:3001/auth/login', credentials)
      .pipe(map(response => {
       // console.log('Server Response:', response);
        if (response.token) {
          //console.log('Token:', response.token);
          localStorage.setItem('token', response.token);
        }
        return response;
      }));
  }

  restore() {
      // Utilizzato nel caso l'applicazione venga abbandonata senza effettuare il logout e poi venga riaperta con il token ancora valido
      const user = localStorage.getItem('user');
      if (!user) {
          return;
      }
      const userData: Data = JSON.parse(user);
      if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
          // Consente di leggere il token, nello specifico data e ora di scadenza
          return;
      }
      this.authSubj.next(userData); // Rientrando nell'applicazione, il BehaviourSubject è di nuovo null (vedi riga 16), di conseguenza riceve i valori presenti nel localStorage, letti dalla variabile user e parsati nella variabile useData
      this.autoLogout(userData);
  }

  signup(data: {
      image: File;
      nome: string;
      cognome: string;
      username: string;
      email: string;
      password: string;
  }) {
      return this.http.post(`${this.baseURL}auth/register`, data);
  }

  logout() {
      this.authSubj.next(null);
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      if (this.timeoutLogout) {
          clearTimeout(this.timeoutLogout);
      }
  }

  autoLogout(data: Data) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(
          data.accessToken
      ) as Date;
      const expirationMilliseconds =
          expirationDate.getTime() - new Date().getTime();
      this.timeoutLogout = setTimeout(() => {
          this.logout();
      }, expirationMilliseconds);
  }





  private errors(err: any) {
      switch (err.error) {
          case 'Email already exists':
              return throwError('Utente già presente');
              break;

          case 'Email format is invalid':
              return throwError('Formato mail non valido');
              break;

          default:
              return throwError('Errore nella chiamata');
              break;
      }
  }
}
