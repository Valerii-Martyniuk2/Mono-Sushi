import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionRoutingModule } from './action-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionComponent } from './action.component';
import { ActionInfoComponent } from './action-info/action-info.component';



@NgModule({
  declarations: [
      ActionComponent,
      ActionInfoComponent
  ],
  imports: [
    CommonModule,
    ActionRoutingModule,
    SharedModule
  ]
})
export class ActionModule { }
