import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SidebarComponent]
})
export class AppComponent {
  title = 'client-side';

  hideSidebar: boolean = false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = this.router.routerState.snapshot.root.firstChild?.routeConfig?.component;
        this.hideSidebar =
          route === LoginComponent
          || route === NotFoundComponent;

      }
    });
  }
}
