import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../models/app-store.model';
import { JwtPayloadModel } from '../models/jwt-payload.model';
import { UserModel } from '../models/user.model';
import { LoadUser, LoadUserSuccess, Logout, UpdateUserData } from '../store/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userName$: Observable<string>;
  publicAddress: string;
  newUserName: string;
  id: string;
  constructor(
    private jwt: JwtHelperService,
    private store: Store<AppStore>
  ) {
    this.userName$ = this.store.pipe(
      select('user', 'username'),
    );
  }

  ngOnInit() {
    const sessionStorage = this.jwt.decodeToken(this.jwt.tokenGetter());
    if (sessionStorage) {
      const { payload: { publicAddress, id } }: JwtPayloadModel = sessionStorage;
      this.publicAddress = publicAddress;
      this.id = id;
      this.store.dispatch(new LoadUserSuccess({ id: this.id }));
      this.store.dispatch(new LoadUser());
    }
  }

  onChangeName(): void {
    const user: Partial<UserModel> = {
      username: this.newUserName,
      id: this.id
    };
    this.store.dispatch(new UpdateUserData(user));
  }

  onLogOut(): void {
    this.store.dispatch(new Logout());
  }
}
