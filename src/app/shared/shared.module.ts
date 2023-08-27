import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, FooterComponent, MenuComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
