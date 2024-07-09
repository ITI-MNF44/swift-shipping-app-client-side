import { EditGovernmentComponent } from './../edit-government/edit-government.component';
import { GovernmentService } from './../../../service/government.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // write your code
        this.GovernmentService.deleteGovernment(governemntId).subscribe({
          next: (data) => {
            console.log(data);
            this.governemnts = this.governemnts.filter(
              (x) => x.id != governemntId
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'government has been deleted.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(console.log(error));
            Swal.fire({
              title: 'The Error?',
              text: 'That thing is still around?',
              icon: 'question',
            });
          },
        });
      }
    });
  }


  editGovernment(id: number) {
    this.router.navigate([`${this.roleRouting}/governments/edit/${id}`]);
  }
}
