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
      id: 1,
      name: "Opinion & Debate"
    },
    {
      id: 2,
      name: "Science & Technology"
    },
    {
      id: 3,
      name: "Music"
    },
    {
      id: 4,
      name: "Sport"
    },
    {
      id: 5,
      name: "Tourism & Culinary"
    },
    {
      id: 6,
      name: "Skill"
    }
  ]

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
      lstSelectedTag: this.lstSelectedTag
    });
    this.postPayload = {
      content: '',
      title: '',
      username: '',
      listTag: []
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body')!.value;
    this.postPayload.title = this.addPostForm.get('title')!.value;
    this.postPayload.listTag = this.addPostForm.get('lstSelectedTag')!.value;
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/home');
    }, error => {
      console.log('Failure Response');
    })
  }

  cancelPost() {
    this.router.navigateByUrl('/home')
  }

}
