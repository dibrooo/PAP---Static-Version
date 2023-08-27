import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
})
export class SchedulesComponent {
  selectedCourse: string;
  selectedYear: string;
  imageUrl: string;

  constructor() {
    this.selectedCourse = 'apoio_gestao';
    this.selectedYear = '1';
    this.imageUrl = '';
  }

  getImageUrl(): string {
    const imageName = `${this.selectedCourse
      .replace(' ', '_')
      .toLowerCase()}_${this.selectedYear.replace(' ', '_').toLowerCase()}.png`;
    this.imageUrl = `../../../assets/horarios/${imageName}`;

    const img = new Image();
    img.src = this.imageUrl;

    if (img.complete) {
      return this.imageUrl;
    } else {
      return '../../../assets/horario/horario_placeholder.jpg';
    }
  }
}
