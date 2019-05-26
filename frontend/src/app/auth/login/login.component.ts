import { Component, OnInit, OnDestroy } from '@angular/core';
import Web3 from 'web3';

let web3: Web3 | undefined; // Will hold the web3 instance

import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginText = 'Login';
  returnUrl: string;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  ngOnDestroy() { }

  async onClick(): Promise<void> {
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();
        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    // Look if user with current publicAddress is already present on backend
    this.http.get(`users?publicAddress=${publicAddress}`).pipe(
      switchMap((users: UserModel[]) =>
        users.length ? of(users[0]) : this.handleSignup(publicAddress)),
      switchMap(this.handleSignMessage),
      switchMap(this.handleAuthenticate),
      switchMap((data: { accessToken: string }) => {
        return this.auth.login(data);
      }),
      catchError((err: Error) => {
        window.alert(err.message ? err.message : err);
        return from([]);
      })
    ).subscribe(() => this.router.navigateByUrl(this.returnUrl));
  }

  handleSignup = (publicAddress: string) => {
    return this.http.post(`users`, { publicAddress });
  }

  handleSignMessage = async ({
    publicAddress,
    nonce
  }: {
    publicAddress: string;
    nonce: string;
  }) => {
    try {
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );

      return { publicAddress, signature };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  }

  handleAuthenticate = ({
    publicAddress,
    signature
  }: {
    publicAddress: string;
    signature: string;
  }) =>
    this.http.post(`auth`, { publicAddress, signature })

}
