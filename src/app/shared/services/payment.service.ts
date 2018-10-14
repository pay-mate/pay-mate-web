
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Payment } from '../models/payment.model';
import { ApiError } from './../models/api-error.model';

import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseApiService {

  private static readonly GROUP_API = `${BaseApiService.BASE_API}/groups`;
  private static readonly PAY_API = `/payments`;

  private payments: Array<Payment> = [];
  private paymentsSubject: Subject<Array<Payment>> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  select(groupId: string, id: String): Observable<Payment | ApiError> {
    return this.http.get<Payment>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((payment: Payment) => Object.assign(new Payment(), payment)),
        catchError(this.handleError));
  }

  delete(groupId: string, id: String): Observable<Payment | ApiError> {
    return this.http.delete<Payment>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.payments = this.payments.filter(payment => payment.id !== id);
          this.notifyPaymentChanges();
        }),
        catchError(this.handleError)
      );

  }

  onPaymentChanges(): Observable<Array<Payment>> {
    return this.paymentsSubject.asObservable();
  }

  private notifyPaymentChanges(): void {
    this.paymentsSubject.next(this.payments);
  }

}