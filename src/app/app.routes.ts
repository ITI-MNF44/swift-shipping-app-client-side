import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { EmployeesComponent } from './components/pages/employees/employees.component';
import { EmployeeDashboardComponent } from './components/pages/employee-dashboard/employee-dashboard.component';
import { DeliverymanFormComponent } from './components/pages/deliveryman-form/deliveryman-form.component';
import { SellerFormComponent } from './components/pages/seller-form/seller-form.component';

export const routes: Routes = [
    { path: '', component:  LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employeedashboard', component: EmployeeDashboardComponent },
    { path: 'adddeliveryman', component: DeliverymanFormComponent },
    { path: 'addseller', component: SellerFormComponent },
    
    { path: '**', component: NotFoundComponent }
];
