import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ContactComponent} from "./home/sections/contact/contact.component";
import {FotoComponent} from "./gallery/foto/foto.component";
import {VideoComponent} from "./gallery/video/video.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'contact', component: ContactComponent},
  {path: 'galerie-foto', component: FotoComponent},
  {path: 'galerie-video', component: VideoComponent},
  {path: 'app/register', component: RegisterComponent},
  {path: 'app/login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
