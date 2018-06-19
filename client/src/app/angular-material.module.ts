import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule, MatInputModule} from "@angular/material";

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})

export class AngularMaterialModule {

}
