import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input()
  number: any = 0;
  @Input()
  order_status: any = 0;
  @Input()
  isAvailable: boolean = true;
  @Output() messageEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  showRoomDetails(number: any) {
    this.messageEvent.emit(number.toString());
  }
}
