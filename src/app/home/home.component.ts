import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../add-post.service';
import {Observable} from 'rxjs';
import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageCur : number = 0;
  pageSize : number = 5;
  totalPages !: number ;
  pageOfPosts: any[] = [];

  // posts: Observable<Array<PostPayload>>;
  posts: any[] = [];
  constructor(private postService: AddPostService) { }

  ngOnInit() {
    this.postService.getAllPosts(this.pageCur,this.pageSize).subscribe(data => {
        this.posts = data['content'];
        // console.log(data['content']);
        this.totalPages = data['totalPages'];
        console.log(this.posts);
    });

  }

  onChangePage(pageOfPosts: Array<any>) {
      // update current page of items
      this.pageOfPosts = pageOfPosts;
  }

}
