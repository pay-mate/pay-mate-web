import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';

import { GroupCreateComponent } from './components/group/group-create/group-create.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { GroupFormComponent } from './components/group/group-form/group-form.component';
import { GroupItemComponent } from './components/group/group-item/group-item.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupResultComponent } from './components/group/group-result/group-result.component';

import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { PaymentCreateComponent } from './components/payment/payment-create/payment-create.component';
import { PaymentDetailComponent } from './components/payment/payment-detail/payment-detail.component';
import { PaymentFormComponent } from './components/payment/payment-form/payment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GroupItemComponent,
    GroupListComponent,
    GroupDetailComponent,
    GroupFormComponent,
    GroupCreateComponent,
    GroupResultComponent,
    UserDetailComponent,
    UserFormComponent,
    UserCreateComponent,
    PaymentCreateComponent,
    PaymentDetailComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
