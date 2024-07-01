import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component:  LoginComponent},
    { path: 'login', component: LoginComponent },
    

    { path: '**', component: NotFoundComponent }
];
