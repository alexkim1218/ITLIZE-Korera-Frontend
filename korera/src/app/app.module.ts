import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import appRoutes from './routerConfig';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormulaComponent } from './formula/formula.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignupComponent } from './component/signup/signup.component';
import { HeaderComponent, UserDialog, QuestionDialog } from './component/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './component/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FormulaComponent,
    HeaderComponent,
    UserDialog,
    QuestionDialog,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    // MatCheckboxModule
    RouterModule.forRoot(appRoutes),
    NgbModule,
  ],
  exports: [
    HeaderComponent,
    MatDialogModule
  ],
  entryComponents: [
    HeaderComponent,
    UserDialog,
    QuestionDialog
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ]
})
export class AppModule {}
