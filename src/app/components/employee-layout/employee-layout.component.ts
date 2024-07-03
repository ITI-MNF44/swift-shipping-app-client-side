import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeSidebarComponent } from "./employee-sidebar/employee-sidebar.component";

@Component({
    selector: 'app-employee-layout',
    standalone: true,
    templateUrl: './employee-layout.component.html',
    styleUrl: './employee-layout.component.css',
    imports: [RouterOutlet, EmployeeSidebarComponent]
})
export class EmployeeLayoutComponent {

}
