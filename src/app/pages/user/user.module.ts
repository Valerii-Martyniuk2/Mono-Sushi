import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user.component';
import { PersonaldataComponent } from './personaldata/personaldata.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';



@NgModule({
  declarations: [
      UserComponent,
      PersonaldataComponent,
      OrderhistoryComponent,
      PasswordchangeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
