import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  latitude: number = 44.480514;
  longitude: number = 26.043097;

  constructor() { }

  ngOnInit() {
  }


  onChoseLocation(e){
    console.log(e);
  }

}
