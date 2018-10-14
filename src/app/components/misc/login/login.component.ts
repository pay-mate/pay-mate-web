import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../shared/models/admin.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  admin: Admin = new Admin();
  apiError: ApiError;

  constructor(private sessionService: SessionService, private router: Router) { }

  onSubmitLogin(loginForm: FormGroup): void {
    if (loginForm.valid) {
      this.sessionService.authenticate(this.admin)
        .subscribe(
          () => {
            loginForm.reset();
            this.router.navigate(['/groups']);
          },
          (error: ApiError) => this.apiError = error
        );
    }
  }
}
