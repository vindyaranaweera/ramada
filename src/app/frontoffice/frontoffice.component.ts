import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.css']
})

export class FrontofficeComponent implements OnInit {
  room = 2;
  Rooms: any = [];
  isVisible: boolean = false;
  suggestions: any;
  buttonText = "ADD";

  constructor() {
  }

  ngOnInit(): void {
  }

  changeScreen(number: number) {
    this.room = number;
  }


  add() {
    this.isVisible = false;
  }

  showRoom($event: string) {
    alert('show room ' + $event);
  }
}
