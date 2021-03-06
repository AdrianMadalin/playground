import {Component, OnInit} from '@angular/core';

declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('#upBtn').hide(['1s', 'slow']).removeClass('entry-upBtn');
    $(window).scroll(function (event) {
      const heigth = $(window).scrollTop();
      if (heigth < 300) {
        // console.log(heigth);
        $('#upBtn').hide(['1s', 'slow']).removeClass('entry-upBtn');
      } else {
        $('#upBtn').show(['1s', 'slow']).addClass('entry-upBtn');
      }
    })
  }

  onScroll() {
    $('html,body').animate({
      scrollTop: $("#foto").offset().top
    }, 'slow');
  }

  scrollTop() {
    $('html,body').animate({scrollTop: 0}, 'slow');
  }
}
