import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { AppStore, TokenModel } from '../../models';
import { GetTokens } from '../../store/actions';
import * as fromTokens from '../../store/selectors/token.selectors';
import { MetaMaskService } from '../../store/services/metamask.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private appService: AppService,
    private store: Store<AppStore>,
    private metaMaskService: MetaMaskService
  ) {
    appService.title.next('Dashboard');
    this.store.dispatch(new GetTokens());
  }
  items$: Observable<TokenModel[]>;

  ngOnInit() {
    this.items$ = this.store.pipe(select(fromTokens.selectAllTokens), delay(500));
  }
}
