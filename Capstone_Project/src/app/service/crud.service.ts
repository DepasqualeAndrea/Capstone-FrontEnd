import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../interface/post.interface';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.urlSocial;


  constructor(private http: HttpClient) { }
  //usata👇
  getAllUsersPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/post/home`);
  }
  //usata👇
  getPostById(postId: number): Observable<any> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/${postId}`);
  }
  //da usare⛔
  modificaPost(data: Post, postId: String): Observable<any> {
    return this.http.put<Post[]>(`${this.baseUrl}/post/${postId}`, data);
  }
  //usata👇
  savePost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/post/save`, formData);
  }
  //da usare⛔
  deletePost(postId: String): Observable<any> {
    return this.http.delete<Post[]>(`${this.baseUrl}/post/${postId}`);
  }
  //da usare⛔
  getUserProfile(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente`);
  }
  //usata👇
  getUserById(userId: number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/utente/${userId}`);
  }
  //usata👇
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get<Post[]>(`${this.baseUrl}/comment/getAllComments/${postId}`);
  }

  //usata👇
  getRepliesByCommentId(commentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reply/byComment/${commentId}`)
  }
  //usata👇
  LikePost(postId: number): Observable<string> {
    const requestBody = { postId: postId };
    return this.http.post(`${this.baseUrl}/post/${postId}/togglelike`, requestBody, { responseType: 'text' });
  }
  commentPost(postId: number, data: {
    content: string
  }): Observable<string> {
    return this.http.post(`${this.baseUrl}/comment/${postId}/create`, data, { responseType: 'text' });
  }
  //da usare⛔
  likeComment() {

  }
  //da usare⛔
  getFollowers() {

  }


}
