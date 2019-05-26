import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NewTokenComponent } from './new-token/new-token.component';
import { TokenListComponent } from './token-list/token-list.component';
import { TokenRoutingModule } from './token-routing.module';
import { DialogSelectContractComponent } from './token/dialog-select-contract/dialog-select-contract.component';
import { TokenComponent } from './token/token.component';

@NgModule({
  declarations: [
    TokenComponent,
    NewTokenComponent,
    TokenListComponent,
    DialogSelectContractComponent,
  ],
  imports: [
    SharedModule,
    TokenRoutingModule
  ],
  providers: [
  ],
  entryComponents: [
    DialogSelectContractComponent,
  ]
})
export class TokenModule { }
