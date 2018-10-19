import { PaymentService } from './../../../shared/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  payment: Payment = new Payment();
  month: Number;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const paymentId = params.paymentId;
      this.paymentService.select(groupId, paymentId)
        .subscribe(
          (payment: Payment) => {
            this.payment = payment;
            const month = payment.date;
          }
        );
  });
}

onPaymentDetails(paymentId: string) {
  this.route.params.subscribe(params => {
    const groupId = params.groupId;
    this.router.navigate(['groups/', groupId, 'payments', paymentId]);
  });
}

onDeletePayment() {
  this.route.params.subscribe(params => {
    const groupId = params.groupId;
    const paymentId = params.paymentId;
    this.paymentService.delete(groupId, paymentId)
      .subscribe(() => { });
  }
  );
}

}


