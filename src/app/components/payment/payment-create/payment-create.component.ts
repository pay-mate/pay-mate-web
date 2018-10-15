import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Payment } from './../../../shared/models/payment.model';
import { PaymentFormComponent } from './../payment-form/payment-form.component';
import { PaymentService } from './../../../shared/services/payment.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {
  @ViewChild(PaymentFormComponent) paymentFormComponent: PaymentFormComponent;
  payment: Payment = new Payment();

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const paymentId = params.paymentId;

      this.paymentService.select(groupId, paymentId)
        .subscribe(
          (payment: Payment) => this.payment = payment
        );
    });
}

onSubmitCreatePaymentForm(groupId: string, payment: Payment): void {
  this.paymentService.create(groupId, payment)
  // tslint:disable-next-line:no-shadowed-variable
  .subscribe((payment: Payment) => {
    this.paymentFormComponent.reset();
  });
}

onDeletePayment() {
  this.route.params.subscribe(params => {
    const groupId = params.groupId;
    const paymentId = this.payment.id;
    this.paymentService.delete(groupId, paymentId)
      .subscribe(() => { });
  });
}

}
