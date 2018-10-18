import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Payment } from '../../../shared/models/payment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      this.usersService.list(groupId).subscribe((users: Array<User>) => this.users = users
      );
    });
  }


  onSubmitPaymentForm(): void {
    if (this.paymentForm.valid) {
      this.paymentSubmit.emit(this.payment);
    }
  }

  reset(): void {
    this.payment = new Payment();
    this.paymentForm.reset();
  }
}
