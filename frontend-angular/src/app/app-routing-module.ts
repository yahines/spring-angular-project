import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { AuthorizationGuard } from './guards/authorization-guard';

import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { LoadStudents } from './load-students/load-students';
import { LoadPayments } from './load-payments/load-payments';
import { Students } from './students/students';
import { Payments } from './payments/payments';
import { Dashboard } from './dashboard/dashboard';
import { StudentDetails } from './student-details/student-details';
import { NewPayment } from './new-payment/new-payment';
import { PaymentDetails } from './payment-details/payment-details';

const routes: Routes = [
  {path : "", component : Login},
  {path : "login", component : Login},
  {path : "admin", component : AdminTemplate,
    canActivate : [AuthGuard],
    children : [
      {path : "home", component : Home},
      {path : "profile", component : Profile},
      {path : "student-details/:code", component : StudentDetails},
      {path : "new-payment/:code", component : NewPayment},
      {path : "payment-details/:id", component : PaymentDetails},
      {
        path : "loadStudents", component : LoadStudents,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {
        path : "loadPayments", component : LoadPayments,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {path : "dashboard", component : Dashboard},
      {path : "students", component : Students},
      {path : "payments", component : Payments},
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
