import { Component } from '@angular/core';
import { BranchesEmployeeComponent } from './components/employee-layout/branches/branches.component';
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
import { EmployeeLayoutComponent } from './components/employee-layout/employee-layout.component';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './components/seller-layout/seller-dashboard/seller-dashboard.component';
import { SellerAddOrderComponent } from './components/seller-layout/seller-add-order/seller-add-order.component';
import { DeliverymanLayoutComponent } from './components/deliveryman-layout/deliveryman-layout.component';
import { DelivaryManOrdersComponent } from './components/deliveryman-layout/delivary-man-orders/delivary-man-orders.component';
import { BranchFormComponent } from './components/admin-layout/branch-form/branch-form.component';
import { WeightSettingsComponent } from './components/admin-layout/weight-settings/weight-settings.component';
import { CitiesComponent } from './components/admin-layout/cities/cities.component';
import { AddCityComponent } from './components/admin-layout/add-city/add-city.component';
import { EmployeeFormComponent } from './components/admin-layout/employee-form/employee-form.component';
import { DeliverymenComponent } from './components/admin-layout/delivrymen/delivrymen.component';

import { RolePermissionsComponent } from './components/admin-layout/role-permissions/role-permissions.component';
import { employeeGaurdGuard } from './Gaurds/employee-gaurd.guard';
import { UserLoginComponent } from './components/shared/user-login/user-login.component';
import { adminGaurdGuard } from './Gaurds/admin-gaurd.guard';
import { deliveryManGaurdGuard } from './Gaurds/delivery-man-gaurd.guard';
import { DisplayOrdersComponent } from './components/employee-layout/display-orders/display-orders.component';

import { SellersComponent } from './components/admin-layout/sellers/sellers.component';

import { GovernmentsComponent } from './components/admin-layout/governments/governments.component';
import { AddGovernmentComponent } from './components/admin-layout/add-government/add-government.component';
import { AcceptordersComponent } from './components/employee-layout/acceptorders/acceptorders.component';

import { sellerGaurdGuard } from './Gaurds/seller-gaurd.guard';
import { HomePageComponent } from './components/shared/home-page/home-page.component';
import { EditGovernmentComponent } from './components/admin-layout/edit-government/edit-government.component';
import { CitiesEmployeeComponent } from './components/employee-layout/cities/cities.component';
import { GovernmentsEmployeeComponent } from './components/employee-layout/governments/governments.component';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGaurdGuard],
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminLayoutComponent },
      { path: 'home', component: AdminLayoutComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'deliverymen', component: DeliverymenComponent },
      { path: 'sellers', component: SellersComponent },
      { path: 'deliveryman/edit/:id', component: DeliverymanFormComponent },
      { path: 'seller/edit/:id', component: SellerFormComponent },
      { path: 'employee/edit/:id', component: EmployeeFormComponent },

      // Add route for branches
      { path: 'branches', component: BranchesComponent },
      { path: 'branches/add', component: BranchFormComponent },
      { path: 'branches/:id/edit', component: BranchFormComponent },
      //Routes for weightSettings
      { path: 'weightSettings', component: WeightSettingsComponent },
      { path: 'orders', component: DisplayOrdersComponent },

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
      { path: 'orders', component: DisplayOrdersComponent },
      { path: 'governments', component: GovernmentsComponent },
      { path: 'governments/add', component: AddGovernmentComponent },
      {
        path: 'governments/edit/:governmentId',
        component: EditGovernmentComponent,
      },
    ],
  },
  {
    path: 'employee',
    canActivate: [employeeGaurdGuard],
    component: EmployeeLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: EmployeeDashboardComponent },
      { path: 'branches', component: BranchesEmployeeComponent },
      { path: 'branches/add', component: BranchFormComponent },
      { path: 'branches/:id/edit', component: BranchFormComponent },

      { path: 'cities', component: CitiesEmployeeComponent },
      { path: 'cities/:id/edit', component: AddCityComponent },
      { path: 'cities/0/add', component: AddCityComponent },

      { path: 'governments', component: GovernmentsEmployeeComponent },
      { path: 'governments/add', component: AddGovernmentComponent },
      {
        path: 'governments/edit/:governmentId',
        component: EditGovernmentComponent,
      },
      { path: 'order', component: DisplayOrdersComponent },
      { path: 'neworders', component: AcceptordersComponent },
    ],
  },
  {
    path: 'seller',
    canActivate: [sellerGaurdGuard],
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'home', component: SellerDashboardComponent },
      { path: 'order/:id/add', component: SellerAddOrderComponent },
      { path: 'orders/:statusId', component: SellerOrdersByStatusComponent },
    ],
  },

  {
    path: 'deliveryman',
    canActivate: [deliveryManGaurdGuard],
    component: DeliverymanLayoutComponent,
    children: [{ path: '', component: DelivaryManOrdersComponent }],
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
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
    path: '**',
    component: NotFoundComponent,
  },
];
