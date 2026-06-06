import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Payment, Student } from '../model/students.model';
@Injectable({
  providedIn: 'root',
})
export class Students {

  constructor(private http : HttpClient) { }

  public getAllPayments() : Observable<Array<Payment>> {
//  return this.http.get(environment.backendHost + "/payments");
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }

  public getAllStudents() : Observable<Array<Student>> {
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`);
  }

  public getStudentPayments(code : string) : Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`);
  }

  public savePayments(formData : any) : Observable<Payment> {
    return this.http.post<Payment>(`${environment.backendHost}/payments`, formData);
  }

  public getPaymentDetails(paymentId : number) {
    return this.http.get(`${environment.backendHost}/paymentFile/${paymentId}`,
                  {responseType:'blob'});
  }

}
