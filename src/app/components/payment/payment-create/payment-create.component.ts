import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Payment } from './../../../shared/models/payment.model';
import { PaymentFormComponent } from './../payment-form/payment-form.component';
import { PaymentService } from './../../../shared/services/payment.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html'
})
export class PaymentCreateComponent implements OnInit {
  @ViewChild(PaymentFormComponent) paymentFormComponent: PaymentFormComponent;
  payment: Payment = new Payment();

  constructor(
    private paymentService: PaymentService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
}

onSubmitCreatePaymentForm(payment: Payment) {
  this.routes.params.subscribe(params => {
    const groupId = params.groupId;
    this.paymentService.create(groupId, payment)
      .subscribe(() => { });
  });
}

onDeletePayment() {
  this.routes.params.subscribe(params => {
    const groupId = params.groupId;
    const paymentId = this.payment.id;
    this.paymentService.delete(groupId, paymentId)
      .subscribe(() => { });
  });
}

}
