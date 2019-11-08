import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ResourceComponent } from './component/resource/resource.component';
import { ProjectComponent } from './component/project/project.component';
import { FormulaComponent } from './component/formula/formula.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'formula', component: FormulaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
