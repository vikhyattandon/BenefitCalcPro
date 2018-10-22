import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';


// Must export the config
export const firebaseConfig = {
  //apiKey: 'AIzaSyC9-rKzmn1eXWlFL-FdCZ7dEuifz7OmaH4',
  //authDomain: 'angular-pre.firebaseapp.com',
  //databaseURL: 'https://angular-pre.firebaseio.com',
  //storageBucket: 'angular-pre.appspot.com',
  //messagingSenderId: '850857190829'

  apiKey: "AIzaSyC9-rKzmn1eXWlFL-FdCZ7dEuifz7OmaH4",
  authDomain: "llmobile-ab12b.firebaseapp.com",
  databaseURL: "https://llmobile-ab12b.firebaseio.com",
  projectId: "llmobile-ab12b",
  storageBucket: "llmobile-ab12b.appspot.com",
  messagingSenderId: "850857190829"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
