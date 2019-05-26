import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { MetaMaskService } from '../../store/services/metamask.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      transition('void <=> *', animate(200)),
    ]),
  ]
})
export class MainComponent implements OnInit {

  sideMenu = [
    {
      title: 'Dashboard',
      link: '/dashboard'
    },
    {
      title: 'My account',
      link: '/profile'
    },
    {
      title: 'Galleries',
      link: '/galleries',
      children: [
        {
          title: 'Create an Ark',
          link: '/galleries/new'
        },
        {
          title: 'My Arks',
          link: '/galleries/my-galleries'
        },
      ],
    },
    {
      title: 'Artworks',
      link: '/artworks',
      children: [
        {
          title: 'Create an Artworks',
          link: '/artworks/new'
        },
        {
          title: 'My Artworks',
          link: '/artworks/my-artworks'
        },
      ]
    },
  ];

  balAndAddr$: Observable<{
    coinbase: string,
    balance: string
  }>;

  constructor(
    private readonly authService: AuthService,
    private metaMaskService: MetaMaskService,
  ) { }

  ngOnInit() {
    this.balAndAddr$ = this.metaMaskService.getBalance();
  }
  onLogOut() {
    this.authService.logout();
  }

}
