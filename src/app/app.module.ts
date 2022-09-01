import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {HomeComponent} from './home/home/home.component';
import {NavbarComponent} from './home/home/navbar/navbar.component';
import {GameComponent} from './home/home/game/game.component';
import {PlayComponent} from './home/home/game/play/play.component';
import {userFeatureKey, reducer} from "./login/store/reducer/login.reducer";


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    GameComponent,
    PlayComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature(userFeatureKey, reducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
