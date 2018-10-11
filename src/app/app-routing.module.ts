
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'group', component: GroupListComponent},
    { path: 'group/:groupId', component: GroupDetailComponent }
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
