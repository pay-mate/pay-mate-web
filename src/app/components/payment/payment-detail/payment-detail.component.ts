import { PaymentService } from './../../../shared/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  payment: Payment = new Payment();
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const paymentId = params.paymentId;
      console.log('LOS PARAMS', params);

      this.paymentService.select(groupId, paymentId)
        .subscribe(
          (payment: Payment) => this.payment = payment
        );
    });
  }

  onDeletePayment() {
    this.route.params.subscribe(params => {
      const groupId = params.groupId;
      const paymentId = params.paymentId;
      this.paymentService.delete(groupId, paymentId)
        .subscribe(() => {});
    }
    );
  }

}


