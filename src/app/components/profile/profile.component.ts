import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  currentUser: any;
  currentDate: Date;
  greeting: string;

  constructor(private storageService: StorageService) {
    this.currentDate = new Date();
    this.greeting = this.setGreeting();
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  setGreeting(): string {
    const currentHour = this.currentDate.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Bom dia';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }
}
