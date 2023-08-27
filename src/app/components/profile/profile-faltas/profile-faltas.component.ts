import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-faltas',
  templateUrl: './profile-faltas.component.html',
  styleUrls: ['./profile-faltas.component.scss'],
})
export class ProfileFaltasComponent implements OnInit {
  faltas?: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserFaltas().subscribe({
      next: (data) => {
        this.faltas = data;
        console.log(this.faltas);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
