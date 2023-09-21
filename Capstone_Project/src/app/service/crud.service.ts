import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { Post } from '../interface/post.interface';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.urlSocial;


  constructor(private http: HttpClient) { }

  getAllUsersPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/post/home`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/${postId}`);
  }

  modificaPost(data: Post, postId: String): Observable<any> {
    return this.http.put<Post[]>(`${this.baseUrl}/post/${postId}`, data);
  }

  savePost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/post/save`, formData);
  }


  deletePost(postId: String): Observable<any> {
    return this.http.delete<Post[]>(`${this.baseUrl}/post/${postId}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/utente/${userId}`);
  }

  getPostComment() {

  }

  getLikePosts() {

  }

  getCommentLike() {

  }

  getFollowers() {

  }


}
