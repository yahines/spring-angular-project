import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Payment, Student } from '../model/students.model';
import { Students } from '../services/students';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit{
  public payments : any;
  public dataSource : any;
  // public payments!: Payment[];
  // public dataSource!: MatTableDataSource<Payment>;
  public displayedColumns = ['id','date','amount','type','status','firstname'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private studentsService : Students) {}

  ngOnInit() {
    this.studentsService.getAllPayments()
              .subscribe({
                next : value => {
                  this.payments = value;
                  this.dataSource = new MatTableDataSource(this.payments);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                },
                error : err => {
                  console.log(err);
                }
              })
  }

}
