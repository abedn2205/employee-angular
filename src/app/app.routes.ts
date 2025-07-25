import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { EmployeeList } from './employee/employee-list/employee-list';
import { AddEmployee } from './employee/add-employee/add-employee';
import { EmployeeDetail } from './employee/employee-detail/employee-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'employees', component: EmployeeList },
  { path: 'employees/add', component: AddEmployee },
  { path: 'employees/:id/:mode', component: EmployeeDetail },
];
