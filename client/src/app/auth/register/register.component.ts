import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  }

  onSubmitRegister() {
    console.log(this.registerForm);
    this.authService.registerUser(      {email: this.registerForm.value.email, password: this.registerForm.value.password})
  }

}
