import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';


import { User } from './../../../shared/models/user.model';
import { Payment } from '../../../shared/models/payment.model';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html'
})
export class PaymentFormComponent implements OnInit {

  @Input() payment: Payment = new Payment();
  @Output() paymentSubmit: EventEmitter<Payment> = new EventEmitter();
  @ViewChild('paymentForm') paymentForm: FormGroup;
  onUserChangesSubscription: Subscription;


  users: Array<User> = [];

  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.usersService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });
  }


  onSubmitPaymentForm(): void {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      if (this.paymentForm.valid) {
        this.paymentSubmit.emit(this.payment);
        this.router.navigate(['groups/', groupId]);
      }
    });
  }

  reset(): void {
    this.payment = new Payment();
    this.paymentForm.reset();
  }

  onGoGroup() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'users']);
    });
  }

  onGoPayments() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'payments']);
    });
  }

  onGoDebt() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.router.navigate(['groups/', groupId, 'debts']);
    });
  }
}
