import { GovernmentService } from './../../../service/government.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';

@Component({
  selector: 'app-governments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './governments.component.html',
  styleUrl: './governments.component.css'
})
export class GovernmentsComponent implements OnInit {

  governemnts: IGovernmentGetDTO[] = [];
  constructor(private GovernmentService: GovernmentService, 
  ) {}

  ngOnInit(): void 
  {
    // Get all branches
   this.getAllGovernments();
  }


  getAllGovernments(): void {
    this.GovernmentService.getAll().subscribe({
      next: (data)=>{this.governemnts = data},
      error: (error)=>{console.log(console.log(error))}
    })
  }

  deleteGovernemnt(governemntId: number){

    this.GovernmentService.deleteGovernment(governemntId).subscribe({
      next: (data)=>{
        console.log(data);
        this.governemnts = this.governemnts.filter(x=>x.id!=governemntId)
      },
      error: (error)=>{console.log(console.log(error))}
    })
  }

}
