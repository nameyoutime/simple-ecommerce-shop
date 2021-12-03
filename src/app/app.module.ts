import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MaterialModule } from './shared/material/material.module';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { NavComponent } from './components/nav/nav.component';
import { UserStateComponent } from './components/user-state/user-state.component';
import { CheckOutModalComponent } from './components/check-out-modal/check-out-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddModalComponent,
    UpdateModalComponent,
    DetailModalComponent,
    NavComponent,
    UserStateComponent,
    CheckOutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
