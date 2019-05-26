import { NgModule } from '@angular/core';

import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewGalleryComponent } from './new-gallery/new-gallery.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [
    SharedModule,
    GalleryRoutingModule
  ],
  exports: [],
  declarations: [GalleryListComponent, NewGalleryComponent, GalleryComponent],
  providers: [],
  entryComponents: [GalleryListComponent],
})
export class GalleryModule { }

