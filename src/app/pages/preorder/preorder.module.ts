import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreorderRoutingModule } from './preorder-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PreorderComponent } from './preorder.component';



@NgModule({
  declarations: [
      PreorderComponent
  ],
  imports: [
    CommonModule,
    PreorderRoutingModule,
    SharedModule
  ]
})
export class PreorderModule { }
