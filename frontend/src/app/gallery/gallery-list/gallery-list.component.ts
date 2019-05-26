import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { AppStore, Gallery } from '../../models';
import { GetGalleries, GetMyGalleries } from '../../store/actions/gallery.actions';
import * as fromGallery from '../../store/selectors/gallery.selectors';
import { MetaMaskService } from '../../store/services/metamask.service';
import { selectRouteData } from '../../store/selectors';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {

  constructor(
    private appService: AppService,
    private store: Store<AppStore>,
    private metaMaskService: MetaMaskService
  ) {
    appService.title.next('Galleries List');
    this.store.pipe(
      select(selectRouteData),
      take(1),
      tap(routeData => {
        if (routeData.hasOwnProperty('myGalleries')) {
          this.store.dispatch(new GetMyGalleries());
        } else {
          this.store.dispatch(new GetGalleries());
        }
      }
      )
    ).subscribe();
  }

  items$: Observable<Gallery[]>;

  ngOnInit() {
    this.items$ = this.store.pipe(select(fromGallery.selectAllGalleries));
  }

}
