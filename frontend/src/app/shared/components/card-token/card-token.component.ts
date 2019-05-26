import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserPublicAddress } from '../../../store';
import { AppStore, TokenModel } from '../../../models';

@Component({
  selector: 'app-card-token',
  templateUrl: './card-token.component.html',
  styleUrls: ['./card-token.component.sass']
})
export class CardTokenComponent implements OnDestroy {

  @Input() item: TokenModel;
  @Input() isListMode: boolean;
  @Input() showSetPrice: boolean;
  @Input() showBuy: boolean;

  @Output() public = new EventEmitter<TokenModel>();
  @Output() setPrice = new EventEmitter<TokenModel>();
  @Output() buy = new EventEmitter<TokenModel>();

  authUserPublicAddress: string;

  authUserIdSUB: Subscription;
  constructor(
    private store: Store<AppStore>
  ) {
    this.authUserIdSUB = this.store.pipe(select(selectUserPublicAddress)).subscribe(
      publicAddress => this.authUserPublicAddress = publicAddress
    );
  }

  ngOnDestroy(): void {
    this.authUserIdSUB.unsubscribe();
  }

  avatarCheck(avatar: string): string {
    // tslint:disable-next-line: max-line-length
    const noAvatar = 'data:image/png;base64,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';
    return avatar || noAvatar;
  }

  canBuy(item: TokenModel): boolean {
    return !!item.price && this.showBuy && item.ownerAddress !== this.authUserPublicAddress;
  }

  onBuy(item: TokenModel): void {
    this.buy.emit(item);
  }

  onPublic(item: TokenModel): void {
    this.public.emit(item);
  }

  isPublic(item: TokenModel): boolean {
    return item.addressContract || this.isListMode || item.ownerAddress !== this.authUserPublicAddress ? false : true;
  }

  onSetPrice(item: TokenModel): void {
    this.setPrice.emit(item);
  }

}
