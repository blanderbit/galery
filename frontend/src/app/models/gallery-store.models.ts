import { EntityState } from '@ngrx/entity';
import { Gallery } from './gallery.model';

export interface GalleryStore extends EntityState<Gallery> {
  // additional entities state properties
  selectedGalleryId: null | number;
  error: null | string;
}
