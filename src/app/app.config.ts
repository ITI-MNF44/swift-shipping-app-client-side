import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptorService } from '@service/interceptors/auth.interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorService])),
    provideAnimationsAsync(),
    importProvidersFrom(NgbModalModule),
  ],
};
