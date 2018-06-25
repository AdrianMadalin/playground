import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public contactForm: FormGroup;

  constructor(private authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  }

  onSubmitLogin() {
    console.log(this.contactForm);
    this.authService.loginUser({email: this.contactForm.value.email, password: this.contactForm.value.password});
  }

}
