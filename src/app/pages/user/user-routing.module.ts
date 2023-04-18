import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserAuthGuard } from '../../shared/guards/userAuth/user-auth.guard';
import { PersonaldataComponent } from './personaldata/personaldata.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';




const routes: Routes = [

    { path: '', component: UserComponent, canActivate: [UserAuthGuard], children:[
            { path: 'personaldata', component:PersonaldataComponent },
            { path: 'orderhistory', component:OrderhistoryComponent },
            { path: 'passwordchange', component:PasswordchangeComponent },
            { path: '', pathMatch:'full', redirectTo:'personaldata' },
        ] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
