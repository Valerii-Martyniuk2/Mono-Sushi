import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environment/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

////// ЛОГІНУВАННЯ/СТВОРЕННЯ ЮЗЕРА - ЗБЕРІГАННЯ ДАННИХ ПРО ЮЗЕРА НА БАЗУ ДАННИХ
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

/////TOASTR//////////
import { ToastrModule } from 'ngx-toastr';

////////PAGES/////////
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { SharedModule } from './shared/shared.module';
import { CallBackComponent } from './components/call-back/call-back.component';
import { BasketComponent } from './components/basket/basket.component';
import { AfterOrderComponent } from './components/after-order/after-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthUserComponent,
    CallBackComponent,
    BasketComponent,
    AfterOrderComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
