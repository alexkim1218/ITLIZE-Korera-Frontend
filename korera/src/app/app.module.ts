import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProjectComponent } from './component/project/project.component';
import { ProjectResourceComponent } from './component/project-resource/project-resource.component';
import { ProjectProjectComponent } from './component/project-project/project-project.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormulaComponent } from './component/formula/formula.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignupComponent } from './component/signup/signup.component';
import { HeaderComponent, UserDialog, QuestionDialog } from './component/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ProjectSelectorComponent } from './component/project-selector/project-selector.component';
import { ResourceNewComponent } from './component/resource-new/resource-new.component';
import { TemplateComponent } from './component/template/template.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {KoreraInterceptor} from './service/korera-interceptor.service';
import { NoCommaPipe } from './no-comma.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FormulaComponent,
    HeaderComponent,
    UserDialog,
    QuestionDialog,
    SidebarComponent,
    ProjectComponent,
    ProjectResourceComponent,
    ProjectProjectComponent,
    ProjectSelectorComponent,
    ResourceNewComponent,
    TemplateComponent,
    NoCommaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgbDropdownModule,
    NgbModalModule,
    AlertModule.forRoot(),
    MatCheckboxModule,
    NgbModule,
    MatIconModule,
    HttpClientModule,
    NgZorroAntdModule,
    //RouterModule.forRoot(appRoutes),
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    MatDialogModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    HeaderComponent,
    UserDialog,
    QuestionDialog
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KoreraInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ]
})
export class AppModule {}
