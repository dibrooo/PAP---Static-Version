import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthLoggedGuard } from './shared/guards/auth-logged.guard';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesDetailsComponent } from './components/courses/courses-details/courses-details/courses-details.component';
import { HonorsComponent } from './components/honors/honors.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news/news-details/news-details.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFaltasComponent } from './components/profile/profile-faltas/profile-faltas.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SchedulesComponent } from './components/schedules/schedules.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthLoggedGuard] },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/details', component: CoursesDetailsComponent },
  { path: 'news', component: NewsComponent },
  // { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'news/details', component: NewsDetailsComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'honors', component: HonorsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/faltas',
    component: ProfileFaltasComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
