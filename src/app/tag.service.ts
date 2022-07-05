import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {
  }

  getPostByTag(tagId: any): any{
    return this.httpClient.get('http://localhost:8080/api/posts/getPostByTag/' + tagId);
  }

}

