import { Payment } from './../../../shared/models/payment.model';
import { PaymentService } from './../../../shared/services/payment.service';
import { User } from './../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  payments: Payment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private paymentsService: PaymentService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = params.userId;
      // console.log('LOS PARAMS', params);

      this.userService.select(groupId, userId)
        .subscribe(
          (user: User) => this.user = user
        );

      this.paymentsService.list(groupId).subscribe((payments: Payment[]) => {
        this.payments = payments.filter(p => p.payer === userId);
      });
    });
  }

  onDeleteUser() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const userId = this.user.id;
      this.userService.delete(groupId, userId)
        .subscribe(() => { });
        this.router.navigate(['groups/', groupId]);
    });
  }

  onLinkCreatePayment() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments', 'create']);
    });
  }

  onPaymentDetails(paymentId: string) {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
    console.log('EL PAYMENT ID', paymentId);
    this.router.navigate(['groups/', groupId, 'payments', paymentId]);
    });
  }
}
