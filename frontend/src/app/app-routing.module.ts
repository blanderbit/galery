import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthorizedComponent } from './layouts/not-authorized/not-authorized.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
  {
    path: 'user',
    component: NotAuthorizedComponent,
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user/login',
  },
  {
    path: 'dashboard',
    component: MainComponent,
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/:artworkId',
    component: MainComponent,
    loadChildren: './token/token.module#TokenModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'galleries',
    component: MainComponent,
    loadChildren: './gallery/gallery.module#GalleryModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'artworks',
    component: MainComponent,
    loadChildren: './token/token.module#TokenModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: MainComponent,
    loadChildren: './profile/profile.module#ProfileModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'user/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
