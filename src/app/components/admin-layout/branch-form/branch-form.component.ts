import { BranchService } from '@service/branch.service';
import { GovernmentService } from './../../../service/government.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css',
})
export class BranchFormComponent implements OnInit {
  // Branch form object
  branchForm = new FormGroup({
    BranchName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    governmentId: new FormControl<number | null>(null, Validators.required),
  });

  branchObj: IBranchGetDTO | undefined;
  governments: IGovernmentGetDTO[] = [];
  branchID: number = 0;

  constructor(
    private branchService: BranchService,
    private governmentService: GovernmentService,
    private route: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllGovernments();
    const id = this.activatedroute.snapshot.params['id'];
    if (id) {
      this.branchID = +id;
      if (this.branchID) {
        this.branchService.getById(this.branchID).subscribe((branch) => {
          this.branchObj = branch;
          this.branchForm.setValue({
            BranchName: branch.name,
            governmentId: branch.governmentId,
          });
        });
      }
    }
  }

  getAllGovernments(): void {
    this.governmentService.getAll().subscribe((governments) => {
      this.governments = governments;
    });
  }

  get branchName(): string {
    return this.branchForm.get('BranchName')?.value as string;
  }

  get governmentId(): number {
    const value = this.branchForm.get('governmentId')?.value;
    return value ? Number(value) : 0;
  }

  onSubmit() {
    if (this.branchForm.valid) {
      let branchData = {
        name: this.branchName,
        governmentId: this.governmentId,
      };

      if (this.branchID == 0) {
        // Add new branch
        this.branchService.addBranch(branchData).subscribe(
          (response) => {
            this.route.navigateByUrl('admin/branches');
          },
          (error) => {
            console.error('Error adding branch:', error);
          }
        );
      } else {
        // Update existing branch
        this.branchService.editBranch(this.branchID, branchData).subscribe(
          (response) => {
            this.route.navigateByUrl('admin/branches');
          },
          (error) => {
            console.error('Error updating branch:', error);
          }
        );
      }
    }
  }
}
