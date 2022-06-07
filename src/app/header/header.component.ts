import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
