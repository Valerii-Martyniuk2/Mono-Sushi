import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action.component';
import { ActionInfoComponent } from './action-info/action-info.component';
import { ActionInfoResolver } from '../../shared/services/action/action-info.resolver';


const routes: Routes = [

    { path: '', component: ActionComponent },
    {
      path: ':id',
      component: ActionInfoComponent,
      resolve: {
        actionInfo: ActionInfoResolver,
      },
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActionRoutingModule {}
