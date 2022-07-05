import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(postPayload: PostPayload){
    return this.httpClient.post('http://localhost:8080/api/posts/createPost', postPayload);
  }

  getAllPosts(page:number,pageSize:number): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/posts/all?page="+page+"&size="+pageSize);}


  getPost(permaLink: Number):any{
    return this.httpClient.get('http://localhost:8080/api/posts/get/' + permaLink);
  }

  getRelatedPost(postId: any): any{
    return this.httpClient.get('http://localhost:8080/api/posts/getRelatedPost/' + postId);
  }

  getPostByTag(tagId: any): any{
    return this.httpClient.get('http://localhost:8080/api/posts/getPostByTag/' + tagId);
  }

}

