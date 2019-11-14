import { TemplateComponent } from './component/template/template.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ResourceNewComponent } from './component/resource-new/resource-new.component';
import { ProjectComponent } from './component/project/project.component';
import { FormulaComponent } from './component/formula/formula.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resource', component: ResourceNewComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'formula', component: FormulaComponent, canActivate: [AuthGuard] },
  { path: 'template', component: TemplateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
