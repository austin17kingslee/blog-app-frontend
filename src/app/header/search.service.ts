import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }
  searchAllPosts(page:number,pageSize:number,title:string): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/posts/findPostByTitle?title="+title+"&page="+page+"&size="+pageSize);}
}

