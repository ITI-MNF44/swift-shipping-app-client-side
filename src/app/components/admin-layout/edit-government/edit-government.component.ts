import { IGovernmentDTO } from './../../../Interface/IGovernmentDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { IGovernmentGetDTO } from './../../../Interface/IGovernmentGetDTO';
import { GovernmentService } from '@service/government.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-government',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-government.component.html',
  styleUrl: './edit-government.component.css'
})
export class EditGovernmentComponent implements OnInit{

  governrmntId : number;
  Government: IGovernmentGetDTO|undefined;

  editGovernmentForm = new FormGroup({
    governmentname: new FormControl('', [Validators.required]),
    isActive: new FormControl(false),
  });

  constructor(
        private GovernmentService: GovernmentService, 
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){
     this.governrmntId =  this.activatedRoute.snapshot.params['governmentId'];

    }

  ngOnInit(): void {
    this.GovernmentService.getById(this.governrmntId).subscribe({
      next: (data)=>{
        this.Government = data;
         console.log(this.Government);

         // Initialize the form after Government data is available
        this.editGovernmentForm.controls.isActive.setValue(data.isActive)
        this.editGovernmentForm.controls.governmentname.setValue(data.name)
       },
     error:(error)=>{console.log(error)}  
    });
  }


  editGovernment(){
    if(this.editGovernmentForm.status=="VALID"){
      let governmentDTO: IGovernmentDTO = {
        isActive: this.editGovernmentForm.controls.isActive.value!,
        name: this.editGovernmentForm.controls.governmentname.value!,
        isDeleted: false,
      }
      this.GovernmentService.editGovernment(this.governrmntId, governmentDTO).subscribe({
        next: (data)=>{console.log(data); this.router.navigate(['admin/governments'])},
        error: (error)=>{console.log(error)}
      })
    }
  }
  
}
