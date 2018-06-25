import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  latitude: number = 44.480514;
  longitude: number = 26.043097;
  public isContact: Boolean = false;
  public contactForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.router.url === '/contact' ? this.isContact = true : this.isContact = false;
    this.createForm();
  }

  onChoseLocation(e){
    console.log(e);
  }

  onSubmitContact() {
    console.log(this.contactForm);
  }

  private createForm() {
    this.contactForm = new  FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, ),
      message: new FormControl(null, [Validators.required]),
    })
  }

}
