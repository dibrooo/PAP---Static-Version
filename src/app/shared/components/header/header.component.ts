import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: Boolean;
  user?: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.loggedIn = this.storageService.isLoggedIn();
    this.user = this.storageService.getUser();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
