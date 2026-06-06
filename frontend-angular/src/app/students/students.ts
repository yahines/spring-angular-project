import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';

import { Payment, Student } from '../model/students.model';
import { Students as StudentsService} from '../services/students';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit{
  public studentsList : Array<Student> = [];
  //public dataSource! : MatTableDataSource<Student>;
  public dataSource = new MatTableDataSource<Student>([]);
  public displayedColumns : string[] = ['id','firstname', 'lastname', 'code', 'programId', 'payments'];

  @ViewChild(MatSort) sort! : MatSort;

  constructor(private studentsService : StudentsService, private router : Router) {}

  ngOnInit() {
    this.studentsService.getAllStudents()
            .subscribe({
              next : value => {
                this.studentsList = value;
  //            this.dataSource = new MatTableDataSource(this.studentsList);
                this.dataSource.data = value;
                this.dataSource.sort = this.sort;
              },
              error : err => {
                console.log(err);
              }
            })
  }

  studentPayments(student : Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }

}
