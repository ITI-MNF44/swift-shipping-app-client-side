import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  ngOnInit(): void {
    console.log(environment.apiUrl);
  }
}
