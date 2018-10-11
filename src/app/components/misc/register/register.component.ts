import { Router } from '@angular/router';
import { AdminService } from './../../../shared/services/admin.service';
import { ApiError } from './../../../shared/models/api-error.model';
import { Admin } from './../../../shared/models/admin.model';
import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  admin: Admin = new Admin();
  apiError: ApiError;

  constructor(private adminService: AdminService, private router: Router) { }

  onSubmitRegister(registerForm: FormGroup): void {
    if (registerForm.valid) {
      this.adminService.create(this.admin)
        .subscribe(
          (admin: Admin) => {
            registerForm.reset();
            this.router.navigate(['/login']);
          },
          (error: ApiError) => this.apiError = error
        );
    }
  }
}
