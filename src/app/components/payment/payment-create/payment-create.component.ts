import { ActivatedRoute } from '@angular/router';
import { Payment } from './../../../shared/models/payment.model';
import { PaymentService } from './../../../shared/services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {

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

onDeletePayment() {
  this.route.params.subscribe(params => {
    const groupId = params.groupId;
    const paymentId = this.payment.id;
    this.paymentService.delete(groupId, paymentId)
      .subscribe(() => { });
  }
  );
}

}
