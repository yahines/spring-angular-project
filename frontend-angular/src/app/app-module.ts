import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminTemplate } from './admin-template/admin-template';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { LoadStudents } from './load-students/load-students';
import { LoadPayments } from './load-payments/load-payments';
import { Login } from './login/login';
import { Students } from './students/students';
import { Payments } from './payments/payments';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { AuthorizationGuard } from './guards/authorization-guard';

@NgModule({
  declarations: [
    App,
    Home,
    Login,
    AdminTemplate,
    Profile,
    LoadStudents,
    LoadPayments,
    Students,
    Payments,
    Dashboard,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [provideBrowserGlobalErrorListeners(),
  //            provideAnimationsAsync(),
              AuthGuard,
              AuthorizationGuard,
              ],
  bootstrap: [App],
})
export class AppModule {}
