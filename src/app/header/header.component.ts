import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { Output, EventEmitter } from '@angular/core';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { SearchService } from './search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faMagnifyingGlass;
  authenticated: boolean = false;
  @Output() newPostEvent = new EventEmitter<any>(); 
  title: string ='';  

  constructor(private authService: AuthService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.isAuthenticated();
    // this.searchAllPosts();
  }

  searchAllPosts(){
    this.searchService.searchAllPosts(0,5,this.title).subscribe(data => {
      console.log(data);
      
      // this.posts = data['content'];
      // console.log("before",this.posts);
      
      // this.posts = this.posts.map((e) =>
      //     e.content.length >  1000
      //       ? { ...e, content: e.content.slice(0,1500) + "... <strong>[continued]</strong>" }
      //       : e
      //   );

      // console.log("after", this.posts);
      // this.totalPages = data['totalPages'];
    });
  }

  addNewPost(value: any){
    this.newPostEvent.emit(value);
  }

  isAuthenticated(){
    this.authenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
