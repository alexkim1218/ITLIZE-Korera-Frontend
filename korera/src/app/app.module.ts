import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './component/project/project.component';
import { ProjectResourceComponent } from './component/project-resource/project-resource.component';
import { ProjectProjectComponent } from './component/project-project/project-project.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignupComponent } from './signup/signup.component';

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
    SignupComponent
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
    // MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
