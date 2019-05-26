import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, of, timer } from 'rxjs';
import { catchError, distinctUntilChanged, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { ArkSellInstance, ArtworkGalleryInstance } from '../../../../../truffle/app/contracts';
import { AppStore, Gallery, TokenModel } from '../../models';
import { UpsertToken } from '../actions';
import { SellSmartContract } from './sell-smart-contract.service';
import { SmartContract } from './smart-contract.service';
import { WEB3 } from './web3.service';
import { WINDOW } from './window.service';
import SellContractAbi from '../../../../../truffle/build/contracts/ArkSell.json';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MetaMaskService {

  constructor(
    private store: Store<AppStore>,
    @Inject(WINDOW) private window: Window,
    @Inject(WEB3) private web3: Web3,
    @Inject(SmartContract) private smartContract: TruffleContract,
    @Inject(SellSmartContract) private sellSmartContract: TruffleContract,
    @Inject('BASE_STORAGE_URL') private storageUrl: string,
    private http: HttpClient,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  public getBalance(): Observable<{
    coinbase: string,
    balance: string
  }> {
    // tslint:disable-next-line: no-unsafe-any no-string-literal
    return from(this.window['ethereum'].enable()).pipe(
      exhaustMap(() => timer(5000, 15000)),
      exhaustMap(() => from(this.web3.eth.getCoinbase())),
      mergeMap(
        coinbase => from(this.web3.eth.getBalance(coinbase)).pipe(
          map(balance => this.web3.utils.fromWei(balance, 'ether')),
          map((balance) => ({ coinbase, balance }))
        ),
      ),
      distinctUntilChanged((a, b) => {
        if (a.coinbase !== b.coinbase) {
          this.snackBar.open('There are An address change has been detected in metamask, please login again.', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
          });
          this.authService.logout();
        }
        return a.coinbase === b.coinbase && a.balance === b.balance;
      }),
      catchError(this.onError),
    );
  }

  publicNewContract(newArkGallery): Observable<TruffleContract> {
    this.smartContract.setProvider(this.web3.givenProvider);
    this.smartContract.numberFormat = 'String';
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from(this.smartContract.new({
          from: address
        }))
      ),
      catchError(this.onError)
    );
  }

  setContractPrice(gallery: Gallery): Observable<Gallery> {
    this.smartContract.setProvider(this.web3.givenProvider);
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from<ArtworkGalleryInstance>(this.smartContract.at(gallery.address)).pipe(
          switchMap(instance => from(instance.setContractPrice(gallery.price, { from: address }))),
          map(() => gallery)
        )
      ),
      // catchError(this.onError)
    );
  }

  addGallery(gallery: {}): Observable<Gallery> {
    return this.http.post('gallery', gallery).pipe(
      catchError(this.onError)
    );
  }

  mintWithTokenURI(token: TokenModel): Observable<boolean> {
    const newToken = token;
    newToken.tokenId = Date.now();
    this.smartContract.setProvider(this.web3.givenProvider);
    this.smartContract.numberFormat = 'String';
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from(this.smartContract.at(token.addressContract)).pipe(
          switchMap((instance: any) => from(instance.mintWithTokenURI(address, token.tokenId, token.filePath, { from: address })))
        )
      ),
      switchMap(() => this.http.patch('tokens/' + newToken.id, newToken)),
      tap(console.log),
    );
  }

  setPrice(oldToken: TokenModel): Observable<TruffleContract> {
    const newToken = oldToken;
    this.sellSmartContract.setProvider(this.web3.givenProvider);
    this.sellSmartContract.numberFormat = 'String';
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from<ArkSellInstance>(this.sellSmartContract.new(newToken.addressContract, { from: address })).pipe(
          tap(instance => newToken.addressMarketContract = instance.address),
          switchMap((instance) => from(instance.setPrice(newToken.tokenId, newToken.price, { from: address }))),
        ),
      ),
      exhaustMap(() => this.setApprove(newToken)),
      switchMap(() => this.http.patch<TokenModel>('tokens/' + newToken.id, newToken)),
      map(artWork => ({ ...artWork, filePath: this.storageUrl + '/' + artWork.filePath })),
      switchMap((token: TokenModel) => of(this.store.dispatch(new UpsertToken({ token })))),
      catchError(this.onError)
    );
  }

  onBuyToken(token: TokenModel): Observable<TokenModel> {
    this.sellSmartContract.setProvider(this.web3.givenProvider);
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from<ArkSellInstance>(this.sellSmartContract.at(token.addressMarketContract)).pipe(
          switchMap(instance => from(
            instance.purchaseToken(token.tokenId, {
              from: address,
              value: this.web3.utils.toWei(`${token.price}`, 'ether'),
              gas: this.web3.utils.toWei('3000', 'kwei'),
              gasPrice: 20000000000
            }))),
        ),
      ),
      switchMap(() => this.http.get('tokens/check-owner/' + token.id)),
      catchError(this.onError)
    );
  }

  buyGallery(gallery: Gallery): Observable<Gallery> {
    this.smartContract.setProvider(this.web3.givenProvider);
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(
        address => from<ArtworkGalleryInstance>(this.smartContract.at(gallery.address)).pipe(
          switchMap(instance => from(
            instance.purchaseContract({
              from: address,
              value: this.web3.utils.toWei(`${gallery.price}`, 'ether')
            }))),
          map(() => gallery)
        ),
      ),
      // catchError(this.onError)
    );
  }

  setApprove(token: TokenModel) {
    this.smartContract.setProvider(this.web3.givenProvider);
    this.smartContract.numberFormat = 'String';
    return from(this.web3.eth.getCoinbase()).pipe(
      exhaustMap(address => from<ArtworkGalleryInstance>(this.smartContract.at(token.addressContract)).pipe(
        switchMap(instance => from(instance.approve(token.addressMarketContract, token.tokenId, { from: address })))
      )),
    );
  }

  onError(err: Error) {
    console.log(err);
    // window.alert(err.message ? err.message : err);
    // return of(err.message);
    return from([]);
  }
}

