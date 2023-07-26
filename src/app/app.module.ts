// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AccountDetailsComponent } from './components/main/account-details/account-details.component';
import { reducers, metaReducers } from './store';
import { AuthEffects } from './store/effects/auth.effects';
import { AccountEffects } from './store/effects/account.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/enviroments';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, AccountEffects]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
