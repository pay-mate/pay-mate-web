import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Payment } from '../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Input() payment: Payment = new Payment();
  @Output() paymentSubmit: EventEmitter<Payment> = new EventEmitter();
  @ViewChild('paymentForm') paymentForm: FormGroup;

  constructor() { }

  ngOnInit() {
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
