import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null,
  };
  isLoginFailed = false;
  errorMessage = '';
  username = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.username = this.storageService.getUser();
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
