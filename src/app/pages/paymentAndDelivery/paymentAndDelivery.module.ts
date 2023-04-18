import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAndDeliveryRoutingModule } from './paymentAndDelivery-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentAndDeliveryComponent } from './paymentAndDelivery.component';
import { GoogleMapsModule } from '@angular/google-maps'




@NgModule({
  declarations: [
      PaymentAndDeliveryComponent
  ],
  imports: [
    CommonModule,
    PaymentAndDeliveryRoutingModule,
    SharedModule,
    GoogleMapsModule
  ],

})

export class PaymentAndDeliveryModule { }
