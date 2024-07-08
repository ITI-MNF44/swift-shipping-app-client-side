import { EditGovernmentComponent } from './../edit-government/edit-government.component';
import { GovernmentService } from './../../../service/government.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-governments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './governments.component.html',
  styleUrl: './governments.component.css',
})
export class GovernmentsComponent implements OnInit {
  governemnts: IGovernmentGetDTO[] = [];
  constructor(
    private GovernmentService: GovernmentService,
    private router: Router
  ) {}

  roleRouting: string | null = null;

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');

    if (role == 'Admin') {
      this.roleRouting = 'admin';
    } else if (role == 'Employee') {
      this.roleRouting = 'employee';
    }

    this.getAllGovernments();
  }

  getAllGovernments(): void {
    this.GovernmentService.getAll().subscribe({
      next: (data) => {
        this.governemnts = data;
      },
      error: (error) => {
        console.log(console.log(error));
      },
    });
  }

  deleteGovernemnt(governemntId: number) {
    this.GovernmentService.deleteGovernment(governemntId).subscribe({
      next: (data) => {
        console.log(data);
        this.governemnts = this.governemnts.filter((x) => x.id != governemntId);
      },
      error: (error) => {
        console.log(console.log(error));
      },
    });
  }

  editGovernment(id: number) {
    this.router.navigate([`${this.roleRouting}/governments/edit/${id}`]);
  }
}
