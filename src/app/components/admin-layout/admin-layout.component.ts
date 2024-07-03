import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css',
    imports: [RouterOutlet, AdminSidebarComponent]
})
export class AdminLayoutComponent {

}
