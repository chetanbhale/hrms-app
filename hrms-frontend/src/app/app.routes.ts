import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { ClientContainer } from './features/client/client-container/client-container';
import { ClientForm } from "./features/client/client-form/client-form";
import { UserForm } from './features/user/user-form/user-form';
import { UserContainer } from './features/user/user-container/user-container';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'dashboard',component:Dashboard,canActivate:[authGuardGuard]},
    {path: 'clients',component: ClientContainer,canActivate: [authGuardGuard]},
    {path: 'users',component: UserContainer,canActivate: [authGuardGuard]},
    {
  path: 'clients/create',
  component: ClientForm
},
    {
  path: 'clients/edit/:id',
  component: ClientForm,
  canActivate: [authGuardGuard]
},
    {
  path: 'users/create',
  component: UserForm,
  canActivate: [authGuardGuard]
},
      // default route
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
