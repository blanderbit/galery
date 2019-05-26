import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { NewGalleryComponent } from './new-gallery/new-gallery.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GalleryListComponent,
  },
  {
    path: 'new',
    component: NewGalleryComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-galleries',
    component: GalleryListComponent,
    data: {
      myGalleries: true,
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-galleries/:galleryId',
    component: GalleryComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-galleries/:galleryId/artworks',
    loadChildren: '../token/token.module#TokenModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':galleryId/artworks',
    loadChildren: '../token/token.module#TokenModule'
  },
  {
    path: ':galleryId',
    component: GalleryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule { }
