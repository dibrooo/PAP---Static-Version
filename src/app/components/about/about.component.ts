import { AfterViewChecked, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  // css
  // id="box"
  // (mousemove)="onZoom($event, 2, 985)"
  // (mouseover)="onZoom($event, 2, 985)"
  // (mouseleave)="offZoom(2)"
  //
  //
  //
  // img!: NodeListOf<HTMLImageElement>;
  // constructor() {}
  // ngAfterViewChecked(): void {
  //   this.img = document.querySelectorAll('#box>img');
  // }
  // onZoom(e: MouseEvent, img_id: number, x_offset: number): void {
  //   const x = e.clientX - x_offset;
  //   const y = e.pageY / 2 - 575;
  //   this.img[img_id].style.transformOrigin = `${x}px ${y}px`;
  //   this.img[img_id].style.transform = 'scale(3)';
  //   console.log(e.clientY, e.pageY, y);
  // }
  // offZoom(img_id: number): void {
  //   this.img[img_id].style.transformOrigin = `center center`;
  //   this.img[img_id].style.transform = 'scale(1)';
  // }
}
