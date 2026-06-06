import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Payment, PaymentType, PaymentStatus } from '../model/students.model';
import { Students as StudentsService} from '../services/students';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.css',
})
export class PaymentDetails implements OnInit {
  paymentId! : number;
  pdfFileUrl! : string;

  constructor(private studentsService : StudentsService,
              private route : ActivatedRoute) {}

  ngOnInit() {
    this.paymentId = this.route.snapshot.params['id'];
    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next : value => {
        let blob = new Blob([value],{type : 'application/pdf'});
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  afterLoadComplete(event : any) {}
}
