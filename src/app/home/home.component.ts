import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../add-post.service';

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
  value = 0;
  constructor(private postService: AddPostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts(this.pageCur,this.pageSize).subscribe(data => {
      console.log(data);

        this.posts = data['content'];
        this.totalPages = data['totalPages'];
    });
  }

  onChangePage(pageOfPosts: Array<any>) {
      // update current page of items
      this.pageOfPosts = pageOfPosts;
  }

  onPageIndexChange(event: any) {
    this.pageCur = event - 1;
    this.getPosts();
    window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
    });
  }
}
