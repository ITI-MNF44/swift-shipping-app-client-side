import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'client-side';

  hideSidebar: boolean = false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = this.router.routerState.snapshot.root.firstChild?.routeConfig?.component;
        this.hideSidebar =
          route === NotFoundComponent;
      }
    });
  }
}
