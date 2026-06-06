import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { Payment, PaymentType, PaymentStatus } from '../model/students.model';
import { Students as StudentsService} from '../services/students';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.html',
  styleUrl: './new-payment.css',
})
export class NewPayment implements OnInit{
  paymentFormGroup! : FormGroup;
  studentCode! : string;
  paymentTypes : string[]=[];
  filePdfUrl! : string;
  showProgress : boolean = false;

  constructor(private fb : FormBuilder,
              private activatedRoute : ActivatedRoute,
              private studentsService : StudentsService,
              private cdr: ChangeDetectorRef){
    }

  ngOnInit(){
    for (let elt in PaymentType) {
      let val = PaymentType[elt];
      if(typeof val === 'string') {
        this.paymentTypes.push(val);
      }
    }
    this.studentCode = this.activatedRoute.snapshot.params['code'];
//  correspond au savePayment de student rest controller
    this.paymentFormGroup = this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      studentCode : this.fb.control(this.studentCode),
      fileSource : this.fb.control(''),
      fileName : this.fb.control('')
    });
  }

  selectFile(event : any) {
    if(event.target.files.length>0){
      let file =event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource : file,
        fileName : file.name
      });
      this.filePdfUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    this.showProgress = true;
    let formData = new FormData();
    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    formData.set('file', this.paymentFormGroup.value.fileSource);
    this.studentsService.savePayments(formData).subscribe({
      next : (value: Payment) => {
        alert('Payment Saved Successfully!');
        this.showProgress = false;
        this.cdr.detectChanges();
      },
      error : (err: HttpErrorResponse) => {
        console.log(err);
        this.showProgress = false;
        this.cdr.detectChanges();
      }
    });
  }

  afterLoadComplete(event: any){
    console.log(event);
  }

}
