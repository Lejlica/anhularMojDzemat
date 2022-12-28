import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms"
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomeComponent } from './home/home.component';
import {AutorizacijaLoginProvjera} from "./_guards/autorizacija-login-provjera.service";
import { NotFoundComponent } from './not-found/not-found.component';

import { ChartsModule } from 'ng2-charts';

import { PostavkeProfilaComponent } from './postavke-profila/postavke-profila.component';
import { VjezbeComponent } from './vjezbe/vjezbe.component';
import { ModeratoriComponent } from './moderatori/moderatori.component';
import { VijestiComponent } from './vijesti/vijesti.component';
import { ImamiComponent } from './imami/imami.component';
import { VijestOdabranaComponent } from './vijest-odabrana/vijest-odabrana.component';
import { VjezbaOdabranaComponent } from './vjezba-odabrana/vjezba-odabrana.component';
import { MojeVjezbeComponent } from './moje-vjezbe/moje-vjezbe.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
@NgModule({
  declarations: [
    AppComponent,
   VjezbeComponent,
    VijestiComponent,
    ModeratoriComponent,
    ImamiComponent,
    VijestOdabranaComponent,
    LoginComponent,
    RegistracijaComponent,
    HomeComponent,
    NotFoundComponent,

    PostavkeProfilaComponent,
    VjezbeComponent,
    ModeratoriComponent,
    VijestiComponent,
    ImamiComponent,
    VijestOdabranaComponent,
    VjezbaOdabranaComponent,
    MojeVjezbeComponent,
    KorisnikComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      {path: 'login', component: LoginComponent},
      {path: 'registracija', component: RegistracijaComponent},
      {path:'vjezbe',component:VjezbeComponent},
      {path:'vijesti',component:VijestiComponent},
      {path:'imami',component:ImamiComponent},
      {path:'vjezba-odabrana/:id',component:VjezbaOdabranaComponent},
      {path:'mojeVjezbe/:id',component:MojeVjezbeComponent},
      {path:'vijest-vijestOdabrana/:id',component:VijestOdabranaComponent},
      {path: 'home', component: HomeComponent, canActivate: [AutorizacijaLoginProvjera]},
      {path: 'postavke-profila', component: PostavkeProfilaComponent, canActivate: [AutorizacijaLoginProvjera]},
      {path: '**', component: NotFoundComponent, canActivate: [AutorizacijaLoginProvjera]},
    ]),
    FormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    AutorizacijaLoginProvjera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
