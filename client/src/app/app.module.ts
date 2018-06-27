import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AngularMaterialModule} from "./angular-material.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import {LoginComponent} from "./auth/login/login.component";
import { EntryComponent } from './home/sections/entry/entry.component';
import { AboutUsComponent } from './home/sections/about-us/about-us.component';
import { CarouselComponent } from './home/sections/carousel/carousel.component';
import { ImagesComponent } from './home/sections/images/images.component';
import { ContactComponent } from './home/sections/contact/contact.component';
import { FotoComponent } from './gallery/foto/foto.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './gallery/video/video.component';

import {AgmCoreModule} from "@agm/core";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {SafePipe} from "./pipes/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EntryComponent,
    AboutUsComponent,
    CarouselComponent,
    ImagesComponent,
    ContactComponent,
    FooterComponent,
    FotoComponent,
    VideoComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: `AIzaSyDcaeuvCfvHQEagB2SwtBpKgC86BijisbU`
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
