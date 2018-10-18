
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
  private static readonly PAY = `/payments`;

  private payments: Array<Payment> = [];
  private paymentsSubject: Subject<Array<Payment>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  create(groupId: string, payment: Payment): Observable <Payment | ApiError> {
    return this.http.post<Payment>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY}`, payment, BaseApiService.defaultOptions )
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      map((payment: Payment, groupId) => {
        payment = Object.assign(new Payment(), payment);
        this.payments.push(payment);
        this.notifyPaymentsChanges();
        return payment;
      }),
      catchError(this.handleError));
  }

  list(groupId: string): Observable<Array<Payment> | ApiError> {
    return this.http.get<Array<Payment>>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY}/`, BaseApiService.defaultOptions)
    .pipe(
      map ((payments: Array<Payment>) => {
        payments = payments.map(payment => Object.assign(new Payment(), payment));
        this.payments = payments;
        this.notifyPaymentsChanges();
        return payments;
      }),
      catchError(this.handleError)
    );
  }

  select(groupId: string, id: String): Observable<Payment | ApiError> {
    return this.http.get<Payment>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((payment: Payment) => Object.assign(new Payment(), payment)),
        catchError(this.handleError));
  }

  delete(groupId: string, id: String): Observable<void | ApiError> {
    return this.http.delete<void>(`${PaymentService.GROUP_API}/${groupId}${PaymentService.PAY}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.payments = this.payments.filter(payment => payment.id !== id);
          this.notifyPaymentsChanges();
        }),
        catchError(this.handleError)
      );

  }

  onPaymentChanges(): Observable<Array<Payment>> {
    return this.paymentsSubject.asObservable();
  }

  private notifyPaymentsChanges(): void {
    this.paymentsSubject.next(this.payments);
  }

}
