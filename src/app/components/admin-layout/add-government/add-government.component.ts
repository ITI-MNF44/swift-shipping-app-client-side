import { GovernmentService } from '@service/government.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-government',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './add-government.component.html',
  styleUrl: './add-government.component.css'
})
export class AddGovernmentComponent {

  constructor(private GovernmentService: GovernmentService, private router: Router){

  }
  governmentForm = new FormGroup({
    governmentName: new FormControl('', [Validators.required, Validators.pattern(/[A-z]{3,}/)]),
  })

  get governmentName(){ return this.governmentForm.controls.governmentName; }

  addGovernment(){
   if(this.governmentForm.status =="VALID" ){
    this.GovernmentService.addGovernment(String(this.governmentName.value)).subscribe({
      next: (data)=>{console.log(data)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "government has been added",
          showConfirmButton: false,
          timer: 1500
        });
         this.router.navigate(['/admin/governments']);
      },
      error: (error)=>{console.log(error)}

    })
   }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fill Required Data",
    });
   }
  }
}
