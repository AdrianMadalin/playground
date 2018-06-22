import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import {AngularMaterialModule} from "./angular-material.module";
import {LoginComponent} from "./auth/login/login.component";
import { EntryComponent } from './home/sections/entry/entry.component';
import { AboutUsComponent } from './home/sections/about-us/about-us.component';
import { CarouselComponent } from './home/sections/carousel/carousel.component';
import { ImagesComponent } from './home/sections/images/images.component';
import { ContactComponent } from './home/sections/contact/contact.component';

import {AgmCoreModule} from "@agm/core";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EntryComponent,
    AboutUsComponent,
    CarouselComponent,
    ImagesComponent,
    ContactComponent,
    FooterComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
