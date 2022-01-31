import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-favourite-card',
  templateUrl: './favourite-card.component.html',
  styleUrls: ['./favourite-card.component.css']
})
export class FavouriteCardComponent implements OnInit {

  @Input()
  protein:any;

  @Input()
  toast:any;

  @Input()
  hashBrown:any;

  @Input()
  eggAvailable:any;

  @Input()
  eggStyle:any;

  @Input()
  title:any;

  @Input()
  image:any;

  visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  clickMe(): void {
    // this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
