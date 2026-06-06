import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource} from '@angular/material/table';

import { Students as StudentsService} from '../services/students';
import { Payment, Student } from '../model/students.model';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit{
  studentCode! : string;
  studentPayments! : Array<Payment>;
//payDataSource! : MatTableDataSource<Payment>;
  payDataSource = new MatTableDataSource<Payment>([]);
  public displayedColumns = ['id','date','amount','type','status','firstname','details'];

  constructor(private activatedRoute : ActivatedRoute,
              private studentsService : StudentsService,
              private router : Router) {}

  ngOnInit() {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.studentsService.getStudentPayments(this.studentCode).subscribe({
      next : value => {
        this.studentPayments = value;
        this.payDataSource.data = value;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  newPayment(){
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);
  }

   paymentDetails(payment:Payment) {
     this.router.navigateByUrl(`/admin/payment-details/${payment.id}`);
   }
}
