import { GovernmentService } from '@service/government.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-government',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './add-government.component.html',
  styleUrl: './add-government.component.css'
})
export class AddGovernmentComponent {

  constructor(private GovernmentService: GovernmentService){

  }
  governmentForm = new FormGroup({
    governmentName: new FormControl('', [Validators.required, Validators.pattern(/[A-z]{3,}/)]),
  })
  
  get governmentName(){ return this.governmentForm.controls.governmentName; }
  
  addGovernment(){
   if(this.governmentForm.status =="VALID" ){
    this.GovernmentService.addGovernment(String(this.governmentName.value)).subscribe({
      next: (data)=>{console.log(data)},
      error: (error)=>{console.log(error)}

    })
   } 
  }
}
