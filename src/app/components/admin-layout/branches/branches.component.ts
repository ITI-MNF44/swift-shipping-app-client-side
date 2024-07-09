import { BranchService } from './../../../service/branch.service';
import { Component, OnInit, NgModule } from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [DatePipe, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  // here i need to get all products from api
  branches: IBranchGetDTO[] = [];

  //CTOR
  constructor(
    private branchService: BranchService,
    private route: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get all branches
    this.getAllBranches();
  }

  onToggleStatus(branch: IBranchGetDTO) {
    this.branchService.toggleActivityStatus(branch.id).subscribe({
      next: () => {
        branch.isActive = !branch.isActive;
      },
      error: () => {
        this.branchService.getById(branch.id).subscribe((updatedBranch) => {
          branch.isActive = updatedBranch.isActive;
        });
      },
      complete: () => {},
    });
  }

  getAllBranches(): void {
    this.branchService.getAllBranches().subscribe((branches) => {
      this.branches = branches;
    });
  }

  //refresh the page
  refreshPage(): void {
    this.getAllBranches();
  }

  //Handle Delete
  deleteBranch(branchId: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this Branch?'
    );
    if (confirmDelete) {
      this.branchService.deleteBranch(branchId).subscribe(
        () => {
          //alert('Successfully Deleted');
          this.route.navigateByUrl('admin/branches');
        },
        (error) => {
          console.error('Error deleting branch:', error);
        }
      );
    }
  }
}
