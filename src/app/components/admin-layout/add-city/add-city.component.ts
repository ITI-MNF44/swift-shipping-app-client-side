import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GovernmentService } from '@service/government.service';
import { RegionService } from '@service/region.service';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NgbdModalOptions } from '../../shared/small-modal/small-modal.component';
import { IRegionDTO } from 'src/app/Interface/IRegionDTO';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgbdModalOptions,
    NgbModalModule,
  ],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css',
})
export class AddCityComponent {
  private modalOptions: NgbdModalOptions = new NgbdModalOptions();
  @ViewChild('content', { static: true }) myModal!: TemplateRef<any>;

  cityForm!: FormGroup;
  governments: IGovernmentGetDTO[] = [];
  id: Observable<number> | undefined;

  constructor(
    private fb: FormBuilder,
    private governmentService: GovernmentService,
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      normalPrice: [50, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pickupPrice: [80, [Validators.required, Validators.pattern('^[0-9]*$')]],
      governmentId: [, Validators.required],
    });

    this.id = this.route.paramMap.pipe(
      map((params) => {
        const idParam = params.get('id');
        return idParam == null ? 0 : +idParam;
      })
    );

    this.id.subscribe((id) => {
      if (!(id == 0 || id == null)) {
        this.getById(id);
      }
    });

    this.getGovernments();
  }

  get f() {
    return this.cityForm.controls;
  }

  onSubmit() {
    if (this.cityForm.valid) {
      let regionDTO: IRegionDTO = this.cityForm.value;

      this.id?.subscribe((id) => {
        if (id == 0) {
          this.addCity(regionDTO);
        } else {
          this.editCity(id, regionDTO);
        }
      });
    } else {
      this.modalOptions.openSm(this.myModal);
    }
  }

  addCity(regionDTO: IRegionDTO) {
    this.regionService.addRegion(regionDTO).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status == 200) {
          const role = localStorage.getItem('userRole');

          if (role == 'Employee') {
            this.router.navigate(['/employee/cities']);
          } else if (role == 'Admin') {
            this.router.navigate(['/admin/cities']);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  editCity(id: any, regionDTO: IRegionDTO) {
    this.regionService.editRegion(id, regionDTO).subscribe({
      next: (response) => {
        if (response.status == 200) {
          const role = localStorage.getItem('userRole');

          if (role == 'Employee') {
            this.router.navigate(['/employee/cities']);
          } else if (role == 'Admin') {
            this.router.navigate(['/admin/cities']);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  getById(id: any) {
    this.regionService.getRegionById(id).subscribe({
      next: (data) => {
        this.cityForm.patchValue({
          name: data.name,
          normalPrice: data.normalPrice,
          pickupPrice: data.pickupPrice,
          governmentId: data.governmentId,
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  getGovernments() {
    this.governmentService.getAll().subscribe({
      next: (response) => {
        this.governments = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
