import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Ng2PlayRoutingModule } from './app-routing.module';

import { HomeComponent } from './home';
import { TodoComponent } from './todo';
import { ReadingComponent } from './reading';
import { AutoReadingComponent } from './autoreading';
import { EmployeeInfoComponent } from './employee-info';
import { EmployeeSearchComponent } from './employee-search';
import { EmployeeRegisterComponent } from './employee-register';
import { AboutComponent } from './about';
import { ProfileComponent } from './profile';
import { MaterialComponent } from './material/material.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './auth-guard';
import { DataService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    ReadingComponent,
    AutoReadingComponent,
    EmployeeInfoComponent,
    EmployeeSearchComponent,
    EmployeeRegisterComponent,
    AboutComponent,
    ProfileComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2PlayRoutingModule
  ],
  providers: [
    {
      provide: AuthConfig,
      useFactory: () => {
        return new AuthConfig();
      },
      deps: [Http]
    },
    AuthHttp,
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
