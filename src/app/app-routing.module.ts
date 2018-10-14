import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { GroupCreateComponent } from './components/group/group-create/group-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';



const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'group', component: GroupListComponent},
    { path: 'group/create', component: GroupCreateComponent },
    { path: 'group/:groupId', component: GroupDetailComponent },
    { path: 'users', component: UserListComponent  },
    { path: '**', component: LoginComponent }
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

