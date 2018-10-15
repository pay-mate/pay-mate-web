
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';

import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { GroupCreateComponent } from './components/group/group-create/group-create.component';

import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';

import { PaymentDetailComponent } from './components/payment/payment-detail/payment-detail.component';
import { PaymentCreateComponent } from './components/payment/payment-create/payment-create.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'groups', component: GroupListComponent},
    { path: 'groups/create', component: GroupCreateComponent },
    { path: 'groups/:groupId', component: GroupDetailComponent },
    { path: 'groups/:groupId/users/:userId', component: UserDetailComponent  },
    { path: 'groups/:groupId/payments/:paymentId', component: PaymentDetailComponent  },
    { path: '**', component: LoginComponent }
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

