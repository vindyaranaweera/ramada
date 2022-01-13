import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input()
  order: any;

  @Input()
  isAvailable: any;

  @Input()
  width: any = 440;

  @Input()
  btnStatus:any;

  @Input()
  btnText:any;

  @Input()
  orderStatus:any;

  @Input()
  roomNumber:any;

  @Input()
  btnserve:any;

  @Output() messageEvent = new EventEmitter<string>();

  listOfData: any;


  constructor() {
  }

  ngOnInit(): void {
    let data = [];
    data.push({category:'cheese',item:'hash',qty:'01'});
    data.push({category:'cheese2',item:'hash2',qty:'01'});
    data.push({category:'cheese3',item:'hash3',qty:'01'});
    this.listOfData = data;
  }

  showOrderDetails(number: any) {
    this.messageEvent.emit(number.toString());
    }
  }

