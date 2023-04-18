import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentAndDeliveryComponent } from './paymentAndDelivery.component';




const routes: Routes = [

    { path: '', component: PaymentAndDeliveryComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentAndDeliveryRoutingModule {}
