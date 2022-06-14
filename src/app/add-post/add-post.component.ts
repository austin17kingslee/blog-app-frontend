import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  lstSelectedTag = new FormControl([]);
  tagSelect = [
    {
      name: "Opinion & Debate",
      value: 1
    },
    {
      name: "Science & Technology",
      value: 2
    },
    {
      name: "Music",
      value: 3
    },
    {
      name: "Sport",
      value: 4
    },
    {
      name: "Tourism & Culinary",
      value: 5
    },
    {
      name: "Skill",
      value: 6
    }
  ]

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
      lstSelectedTag: this.lstSelectedTag
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
      tags: []
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body')!.value;
    this.postPayload.title = this.addPostForm.get('title')!.value;
    this.postPayload.tags = this.addPostForm.get('lstSelectedTag')!.value;
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/home');
    }, error => {
      console.log('Failure Response');
    })
  }

  canclePost() {
    this.router.navigateByUrl('/home')
  }
}
