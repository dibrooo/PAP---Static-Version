import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesDetailsComponent } from './components/courses/courses-details/courses-details/courses-details.component';
import { HonorsComponent } from './components/honors/honors.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news/news-details/news-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFaltasComponent } from './components/profile/profile-faltas/profile-faltas.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { SharedModule } from './shared/shared.module';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AboutComponent,
    HonorsComponent,
    NewsComponent,
    SchedulesComponent,
    CoursesComponent,
    NewsDetailsComponent,
    RegistrationComponent,
    CoursesDetailsComponent,
    ProfileComponent,
    ProfileFaltasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
