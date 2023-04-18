import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreorderComponent } from './preorder.component';

const routes: Routes = [{ path: "", component: PreorderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreorderRoutingModule {}
