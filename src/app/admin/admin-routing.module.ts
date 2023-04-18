import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';



const routes: Routes = [

    {
      path: '',
      component: AdminComponent,
      canActivate: [AuthGuard],
      children: [
      { path: 'actions', component: AdminActionsComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: '', pathMatch: 'full', redirectTo:'actions' },
      ],
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
