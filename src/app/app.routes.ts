import { Routes } from '@angular/router';
import {  UserListComponent} from './components/user-list/user-list.component';
import {  UserCreateComponent} from './components/user-create/user-create.component';
import {  UserEditComponent} from './components/user-edit/user-edit.component';
import {  UserDetailComponent} from './components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UserListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'edit/:id', component: UserEditComponent },
  { path: '**', redirectTo: 'list' }
];
