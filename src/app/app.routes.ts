import { SellerOrdersByStatusComponent } from './components/seller-layout/seller-orders/seller-orders.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { EmployeesComponent } from './components/admin-layout/employees/employees.component';
import { EmployeeDashboardComponent } from './components/employee-layout/employee-dashboard/employee-dashboard.component';
import { DeliverymanFormComponent } from './components/admin-layout/deliveryman-form/deliveryman-form.component';
import { SellerFormComponent } from './components/admin-layout/seller-form/seller-form.component';
import { BranchesComponent } from './components/admin-layout/branches/branches.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-layout/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-layout/admin-login/admin-login.component';
import { SellerLoginComponent } from './components/seller-layout/seller-login/seller-login.component';
import { DeliverymanLoginComponent } from './components/deliveryman-layout/deliveryman-login/deliveryman-login.component';
import { EmployeeLayoutComponent } from './components/employee-layout/employee-layout.component';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './components/seller-layout/seller-dashboard/seller-dashboard.component';
import { SellerAddOrderComponent } from './components/seller-layout/seller-add-order/seller-add-order.component';

// export const routes: Routes = [
//     { path: '', component:  LoginComponent},
//     { path: 'login', component: LoginComponent },
//     { path: 'employees', component: EmployeesComponent },
//     { path: 'employeedashboard', component: EmployeeDashboardComponent },
//     { path: 'adddeliveryman', component: DeliverymanFormComponent },
//     { path: 'addseller', component: SellerFormComponent },
//     { path: 'branches', component: BranchesComponent },

//     { path: '**', component: NotFoundComponent }
// ];
import { DeliverymanLayoutComponent } from './components/deliveryman-layout/deliveryman-layout.component';
import { DelivaryManOrdersComponent } from './components/deliveryman-layout/delivary-man-orders/delivary-man-orders.component';

import { BranchFormComponent } from './components/admin-layout/branch-form/branch-form.component';
import { CitiesComponent } from './components/admin-layout/cities/cities.component';
import { AddCityComponent } from './components/admin-layout/add-city/add-city.component';
import { EmployeeFormComponent } from './components/admin-layout/employee-form/employee-form.component';
import { RolePermissionsComponent } from './components/admin-layout/role-permissions/role-permissions.component';
import { employeeGaurdGuard } from './Gaurds/employee-gaurd.guard';
import { UserLoginComponent } from './components/shared/user-login/user-login.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'deliverymen', component: EmployeesComponent },
      { path: 'deliveryman/edit/:id', component: DeliverymanFormComponent },

      {
        path: 'roles/:role/permissions',
        component: RolePermissionsComponent,
      },

      { path: 'employee/edit/:id', component: EmployeeFormComponent },

      // Add route for branches
      { path: 'branches', component: BranchesComponent },
      { path: 'branches/add', component: BranchFormComponent },
      { path: 'branches/:id/edit', component: BranchFormComponent },

      { path: 'cities', component: CitiesComponent },
      { path: 'cities/:id/edit', component: AddCityComponent },
      { path: 'cities/0/add', component: AddCityComponent },
    ],
  },
  {
    path: 'employee',
    canActivate: [employeeGaurdGuard],
    component: EmployeeLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: EmployeeDashboardComponent },
      { path: 'branches', component: BranchesComponent },
      { path: 'branches/add', component: BranchFormComponent },
      { path: 'branches/:id/edit', component: BranchFormComponent },

      { path: 'cities', component: CitiesComponent },
      { path: 'cities/:id/edit', component: AddCityComponent },
      { path: 'cities/0/add', component: AddCityComponent },
    ],
  },
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'home', component: SellerDashboardComponent },
      { path: 'orders/:sellerId/:statusId', component: SellerOrdersByStatusComponent },
      { path: 'home', component: SellerDashboardComponent },
    ],
  },

  {
    path: 'deliveryman',
    component: DeliverymanLayoutComponent,
    children: [{ path: '', component: DelivaryManOrdersComponent }],
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
  {
    path: 'admin/login',

    component: AdminLoginComponent,
  },
  {
    path: 'employee/login',
    component: UserLoginComponent,
  },
  {
    path: 'seller/login',
    component: UserLoginComponent,
  },
  {
    path: 'deliveryman/login',
    component: UserLoginComponent,
  },
  {
    path: '',
    component: NotFoundComponent,
  },
];
