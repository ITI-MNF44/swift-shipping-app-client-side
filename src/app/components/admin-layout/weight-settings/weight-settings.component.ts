import { WeightSettingsService } from './../../../service/weight-settings.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { IWeightSettingDto } from 'src/app/Interface/IWeightSettingDto';

@Component({
  selector: 'app-weight-settings',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './weight-settings.component.html',
  styleUrl: './weight-settings.component.css',
})
export class WeightSettingsComponent implements OnInit 
{
  //form, and api object
  weightForm: FormGroup;
  weightSetting: IWeightSettingDto | null = null;

  constructor(
    private weightService: WeightSettingsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.weightForm = this.fb.group({
      defaultWeight: ['', [Validators.required]],
      kgPrice: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getWeightSettings();
  }
  //to get data from api
  getWeightSettings(): void 
  {
    this.weightService.getWeightSetting().subscribe((weightSetting) => {
      this.weightSetting = weightSetting;
      this.weightForm.patchValue({
        defaultWeight: weightSetting.defaultWeight,
        kgPrice: weightSetting.kgPrice
      });
    });
  }

  //
  onSubmit(): void {
    if (this.weightForm.valid) {
      const updatedWeightSetting: IWeightSettingDto = this.weightForm.value;
      this.weightService.editWeightsetting(updatedWeightSetting).subscribe(response => {
        // Handle response, e.g., navigate back to the list or show a success message
        this.router.navigateByUrl('admin/weightSettings');  
      });
    }
  }

}
