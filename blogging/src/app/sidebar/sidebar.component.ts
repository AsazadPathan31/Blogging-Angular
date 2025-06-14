import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.menuItems = [
      {
        path: '/profile',
        title: 'About',
        icon: 'info',
        class: '',
        adminAccessRequired: false,
        showWhenLoggedIn: true,
      },
      {
        path: '/blogs',
        title: 'Blogs',
        icon: 'home',
        class: '',
        adminAccessRequired: false,
        showWhenLoggedIn: true,
      },
      {
        path: '/create',
        title: 'Create',
        icon: 'create',
        class: '',
        adminAccessRequired: true,
        showWhenLoggedIn: true,
      },
      {
        path: '/adminlogin',
        title: 'Admin',
        icon: 'login',
        class: '',
        adminAccessRequired: false,
        showWhenLoggedIn: false,
      },
    ];
  }
}
