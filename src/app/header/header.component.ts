import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faMagnifyingGlass;
  authenticated: boolean = false;

  constructor(private authService: AuthService) {
  }

  isAuthenticated(){
    this.authenticated = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
