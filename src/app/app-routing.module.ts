import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'offer',
    loadChildren:()=>import('./pages/action/action.module').then(m => m.ActionModule)
  },
  {
    path: 'product/:category',
    loadChildren:()=>import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'paiment.delivery',
    loadChildren:()=>import('./pages/paymentAndDelivery/paymentAndDelivery.module').then(m => m.PaymentAndDeliveryModule)
  },
  {
    path: 'about',
    loadChildren:()=>import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'user',
    loadChildren:()=>import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'preorder',
    loadChildren:()=>import('./pages/preorder/preorder.module').then(m => m.PreorderModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
