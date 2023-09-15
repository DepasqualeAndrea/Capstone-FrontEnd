import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../auth/data.interface';
import { Observable, map } from 'rxjs';
import { Post } from '../interface/post.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //private baseUrl = environment.urlSocial;

/*
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getPost(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/post`);
  }

  modificaPost(data: Post, postId: String): Observable<any> {
    return this.http.put<Post[]>(`${this.baseUrl}/post/${postId}`, data);
  }

  savePost(data: Post): Observable<any> {
    return this.http.post<Post[]>(`${this.baseUrl}/post/save`, data);
  }

  deletePost(postId: String): Observable<any> {
    return this.http.delete<Post[]>(`${this.baseUrl}/post/${postId}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente`);
  }

  getUserInfo(userId: string): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }

  getPostComment(){

  }

  getLikePosts(){

  }

  getCommentLike(){

  }

  getFollowers(){

  }

*/
}
