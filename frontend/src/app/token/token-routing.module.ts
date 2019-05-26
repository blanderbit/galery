import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TokenComponent } from './token/token.component';
import { NewTokenComponent } from './new-token/new-token.component';
import { TokenListComponent } from './token-list/token-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TokenListComponent,
  },
  {
    path: 'new',
    component: NewTokenComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-artworks',
    component: TokenListComponent,
    data: {
      myArtworks: true,
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-artworks/:artworkId',
    component: TokenComponent,
    data: {
      myArtworks: true,
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-artworks/artwork/:artworkId',
    component: TokenComponent,
    data: {
      myArtworks: true,
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'artwork/:artworkId',
    redirectTo: ':artworkId'
  },
  {
    path: ':artworkId',
    component: TokenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenRoutingModule { }
