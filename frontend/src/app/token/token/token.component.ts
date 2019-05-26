import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppStore, TokenModel } from '../../models';
import { selectCurrentTokenByRouter, selectGalleryIds } from '../../store/selectors';
import { MetaMaskService } from '../../store/services/metamask.service';
import { DialogSelectContractComponent } from './dialog-select-contract/dialog-select-contract.component';
import { DialogSetPriceComponent } from '../../shared/components/dialog-set-price/dialog-set-price.component';
import { GetTokens, GetMyGalleries, GetTokenById } from '../../store/actions';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  contractIds: any;
  item$: Observable<TokenModel>;
  constructor(
    private store: Store<AppStore>,
    private metaMaskService: MetaMaskService,
    public dialog: MatDialog
  ) {
    this.store.pipe(select(selectGalleryIds),
      tap(ids => this.contractIds = ids)
    ).subscribe();
    this.store.dispatch(new GetMyGalleries());
  }

  openDialog(token: TokenModel): void {
    const dialogRef = this.dialog.open(DialogSelectContractComponent, {
      width: '500px',
      data: { addresses: this.contractIds }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onPublic({ ...token, addressContract: result });
      }
    });
  }

  openSetPriceDialog(token: TokenModel): void {
    const dialogRef = this.dialog.open(DialogSetPriceComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onSetPrice({ ...token, price: result });
      }
    });
  }

  ngOnInit() {
    this.item$ = this.store.pipe(
      select(selectCurrentTokenByRouter),
      tap(g => {
        if (!g) {
          this.store.dispatch(new GetTokens());
        }
      }),
    );
  }

  onPublic(token: TokenModel) {
    this.metaMaskService.mintWithTokenURI(token).subscribe(() => this.store.dispatch(new GetTokens()));
  }

  onSetPrice(token: TokenModel): void {
    this.metaMaskService.setPrice(token).subscribe();
  }

  onBuy(tokenToBuy: TokenModel) {
    this.metaMaskService.onBuyToken(tokenToBuy).subscribe(token => {
      this.store.dispatch(new GetTokenById({ tokenId: token.id }));
    });
  }

}
