import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Gallery, AppStore } from '../../../models';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUserPublicAddress } from 'src/app/store';

@Component({
  selector: 'app-card-gallery',
  templateUrl: './card-gallery.component.html',
  styleUrls: ['./card-gallery.component.sass']
})
export class CardGalleryComponent implements OnDestroy {

  @Input() item: Gallery;
  @Input() isListMode: boolean;
  @Input() showSetPrice: boolean;
  @Input() showBuy: boolean;

  @Output() public = new EventEmitter<Gallery>();
  @Output() setPrice = new EventEmitter<Gallery>();
  @Output() buy = new EventEmitter<Gallery>();

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

  canBuy(item: Gallery): boolean {
    return !!item.price && this.showBuy && item.ownerAddress !== this.authUserPublicAddress;
  }

  onBuy(item: Gallery): void {
    this.buy.emit(item);
  }

  onSetPrice(item: Gallery): void {
    this.setPrice.emit(item);
  }

}
