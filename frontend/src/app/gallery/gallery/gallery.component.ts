import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppStore, Gallery } from '../../models';
import { DialogSetPriceComponent } from '../../shared/components/dialog-set-price/dialog-set-price.component';
import { GetGallery, SetGalleryPrice, BuyGallery } from '../../store/actions/gallery.actions';
import { selectCurrentGalleryByRouter } from '../../store/selectors';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  item$: Observable<Gallery>;

  constructor(
    private store: Store<AppStore>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.item$ = this.store.pipe(
      select(selectCurrentGalleryByRouter),
      tap(g => {
        if (!g) {
          this.store.dispatch(new GetGallery());
        }
      })
    );
  }

  openSetPriceDialog(gallery: Gallery): void {
    const dialogRef = this.dialog.open(DialogSetPriceComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSetPrice({ ...gallery, price: result });
      }
    });
  }

  onSetPrice(gallery: Gallery): void {
    this.store.dispatch(new SetGalleryPrice({ gallery }));
  }

  onBuy(gallery: Gallery): void {
    this.store.dispatch(new BuyGallery({ gallery }));
  }

}
