import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { AppStore, TokenModel } from '../../models';
import { GetMyTokens, GetTokens } from '../../store/actions';
import * as fromSelectors from '../../store/selectors';
import { selectRouteData, selectRouteParameters } from '../../store/selectors';
import { MetaMaskService } from '../../store/services/metamask.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {
  forGallery: boolean;
  constructor(
    private appService: AppService,
    private store: Store<AppStore>,
    private metaMaskService: MetaMaskService
  ) {
    appService.title.next('Artworks');
    this.store.pipe(
      select(selectRouteData),
      take(1),
      tap(routeData => {
        if (routeData.hasOwnProperty('myArtworks')) {
          this.store.dispatch(new GetMyTokens());
        } else {
          this.store.dispatch(new GetTokens());
        }
      }
      )
    ).subscribe();
    this.store.pipe(
      select(selectRouteParameters),
      take(1),
      tap(routeParams => this.forGallery = routeParams.hasOwnProperty('galleryId'))
    ).subscribe();
  }
  items$: Observable<TokenModel[]>;

  ngOnInit() {
    const selector = this.forGallery ? fromSelectors.selectCurrentGalleryTokens : fromSelectors.selectAllTokens;
    this.items$ = this.store.pipe(select(selector), delay(500));
  }

}
