import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectComponent } from './component/project/project.component';
import { ProjectResourceComponent } from './component/project-resource/project-resource.component';
import { ProjectProjectComponent } from './component/project-project/project-project.component';
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

import { MatCheckboxModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

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
    MatCheckboxModule,
    NgbModule,
    MatIconModule,
    HttpClientModule,
    NgZorroAntdModule,
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
