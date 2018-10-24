import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';

import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { GroupResultComponent } from './components/group/group-result/group-result.component';
import { GroupCreateComponent } from './components/group/group-create/group-create.component';

import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

import { PaymentDetailComponent } from './components/payment/payment-detail/payment-detail.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentCreateComponent } from './components/payment/payment-create/payment-create.component';

import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'groups', canActivate: [IsAuthenticatedGuard], component: GroupListComponent},
  { path: 'groups/create', canActivate: [IsAuthenticatedGuard], component: GroupCreateComponent },
  { path: 'groups/:groupId', canActivate: [IsAuthenticatedGuard], component: GroupDetailComponent },
  { path: 'groups/:groupId/debts', canActivate: [IsAuthenticatedGuard], component: GroupResultComponent },
  { path: 'groups/:groupId/users', canActivate: [IsAuthenticatedGuard], component: UserListComponent  },
  { path: 'groups/:groupId/users/create', canActivate: [IsAuthenticatedGuard], component: UserCreateComponent  },
  { path: 'groups/:groupId/users/:userId', canActivate: [IsAuthenticatedGuard], component: UserDetailComponent  },
  { path: 'groups/:groupId/payments/create', canActivate: [IsAuthenticatedGuard], component: PaymentCreateComponent  },
  { path: 'groups/:groupId/payments', canActivate: [IsAuthenticatedGuard], component: PaymentListComponent },
  { path: 'groups/:groupId/payments/:paymentId', canActivate: [IsAuthenticatedGuard], component: PaymentDetailComponent  },
  { path: '**', redirectTo: '/login' }
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

