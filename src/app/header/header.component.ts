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
  }

  searchAllPosts(){
    this.searchService.searchAllPosts(0,5,this.title).subscribe(data => {
      console.log(data);
      this.newPostEvent.emit(data.body);
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
