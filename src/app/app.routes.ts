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
import { EmployeeLoginComponent } from './components/employee-layout/employee-login/employee-login.component';
import { SellerLoginComponent } from './components/seller-layout/seller-login/seller-login.component';
import { DeliverymanLoginComponent } from './components/deliveryman-layout/deliveryman-login/deliveryman-login.component';
import { EmployeeLayoutComponent } from './components/employee-layout/employee-layout.component';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './components/seller-layout/seller-dashboard/seller-dashboard.component';
import { DeliverymanLayoutComponent } from './components/deliveryman-layout/deliveryman-layout.component';
import { DelivaryManOrdersComponent } from './components/deliveryman-layout/delivary-man-orders/delivary-man-orders.component';
import { RolePermissionsComponent } from './components/admin-layout/role-permissions/role-permissions.component';

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

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'deliveryman/edit/:id', component: DeliverymanFormComponent },
      {
        path: 'roles/:role/permissions',
        component: RolePermissionsComponent,
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeeLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: EmployeeDashboardComponent },
    ],
  },
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'home', component: SellerDashboardComponent },
    ],
  },
  {
    path: 'deliveryman',
    component: DeliverymanLayoutComponent,
    children: [{ path: '', component: DelivaryManOrdersComponent }],
  },

  // {
  //     path: 'dashboard',
  //     component: DashboardComponent,
  //     children: [
  //         {
  //             path: 'home',
  //             component: AdminHomeComponent,
  //         },
  //         {
  //             path: 'allproducts',
  //             component: ProductsTableComponent,
  //         },
  //         {
  //             path: 'product/:id/edit',
  //             component: AddProductComponent,
  //         },
  //         {
  //             path: 'category',
  //             component: CategoryTableComponent,
  //         },
  //         {
  //             path: 'brands',
  //             component: BrandTableComponent,
  //         },
  //     ],
  // },

  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'employee/login',
    component: EmployeeLoginComponent,
  },
  {
    path: 'seller/login',
    component: SellerLoginComponent,
  },
  {
    path: 'deliveryman/login',
    component: DeliverymanLoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
