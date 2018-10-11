import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { LoginComponent } from './components/misc/login/login.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupItemComponent } from './components/group/group-item/group-item.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupDetailComponent
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
