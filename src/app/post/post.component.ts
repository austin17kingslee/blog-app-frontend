import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import {AddPostService} from '../add-post.service';
import { CommentPayload } from '../add-post/comment-payload';
import {PostPayload} from '../add-post/post-payload';
import { CommentService } from '../comment.service';


// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post!: PostPayload;
  permaLink!: Number;
  page:number = 0;
  pageSize:number = 5;
  comment: String = '';
  username!: any ;
  listComment: any;
  commentPayload!: CommentPayload;

  constructor(private router: ActivatedRoute, private postService: AddPostService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })

    this.getComment();

    // console.log(this.$localStorage.retrieve('username')); 
  }

  getComment(){
    this.commentService.getComment(this.permaLink,this.page,this.pageSize).subscribe((data:any) => {
      this.listComment = data['content'];
      console.log(this.listComment);
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  submitComment(){  

    this.commentPayload = {
      postId: this.permaLink, 
      username: window.localStorage.getItem('username')||'',
      comment: this.comment
    }

    if(window.localStorage.getItem('username') == null){
      this.commentPayload.username = 'Anonymous';
    }

    this.commentService.addComment(this.commentPayload).subscribe(data => {
      console.log(data);
      this.getComment();
    },(err: any) => {
      console.log('Failure Response');
    })

    this.comment = '';
  }


}
