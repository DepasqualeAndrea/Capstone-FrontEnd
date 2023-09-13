import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../auth/data.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl ='http://localhost:3001/user';
  user: any;

  constructor(private http: HttpClient) { }

  getUser():Observable<Data[]> {
    const params = new HttpParams();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token: ')}`
    });

    return this.http.get<any>(this.baseUrl, {params, headers})
    .pipe(map(response => response.content));
  }
 /* getUser(){
    return this.http.get<any>(this.baseUrl);
  }*/
}
