import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  //{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'members',canActivate: [AuthGuardService],loadChildren: './members/member-routing.module#MemberRoutingModule'},
  //{ path: 'tabs',  canActivate: [AuthGuardService], loadChildren: './tabs/tabs.module#TabsPageModule' },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }