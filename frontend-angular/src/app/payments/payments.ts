import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';


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
  public displayedColumns = ['id','date','amount','type','status','firstName'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private http : HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8787/payments")
              .subscribe({
                next : data =>{
                  this.payments = data;
                  this.dataSource = new MatTableDataSource(this.payments);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;

                },
                error : err =>{
                  console.log(err)
                }
              })
  }

}
