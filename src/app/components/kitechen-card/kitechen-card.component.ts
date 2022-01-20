import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kitechen-card',
  templateUrl: './kitechen-card.component.html',
  styleUrls: ['./kitechen-card.component.css']
})
export class KitechenCardComponent implements OnInit {

  @Input()
  cardTitle:any;

  @Input()
  protien:any;

  @Input()
  toast:any;

  @Input()
  hashbrown:any;

  @Input()
  roomNo:any;

  @Input()
  time:any;

  @Input()
  eggAvailable:any=0;

  @Input()
  eggStyle:any;

  @Input()
  bgColor:any;


  constructor() { }

  ngOnInit(): void {
  }

}
