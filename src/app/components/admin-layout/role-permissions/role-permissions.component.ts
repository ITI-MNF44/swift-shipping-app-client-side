import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '@service/role.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import { IPermissionDTO } from 'src/app/Interface/IPermissionDTO';
import { IRolePermissions } from 'src/app/Interface/IRolePermissions';

import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    TagModule,
    MultiSelectModule, // Add MultiSelectModule here
    DropdownModule,
    ButtonModule,
    FormsModule,
    MessagesModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css',
})
export class RolePermissionsComponent implements OnInit {
  roleName: string = '';
  routeSubscriber: Subscription | undefined;
  subscriber: Subscription | undefined;
  rolePermissions: IRolePermissions[] = [];
  loading: boolean = true;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private roleApi: RoleService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.routeSubscriber = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.roleName = params['role'];
        this.getRolePermissions();
      },
    });
  }
  saveChanges() {
    this.roleApi
      .updatePermissionsByRole(this.roleName, this.rolePermissions)
      .subscribe({
        next: () => {
          console.log('updated');
          this.addSingle();
        },
      });
  }
  discard() {
    this.getRolePermissions();
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  getRolePermissions() {
    this.subscriber = this.roleApi
      .getPermissionsByRole(this.roleName)
      .subscribe({
        next: (data) => {
          this.rolePermissions = data;
          console.log(this.rolePermissions);
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
