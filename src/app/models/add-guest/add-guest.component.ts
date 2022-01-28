import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  @Input()
  isVisible = false;

  @Input()
  visibleType:any

  @Output() resetVisibility= new EventEmitter<boolean>();

  checkInDate = null;
  checkOutDate=null;
  isEnglish = false;
  count = 5;

  constructor(private i18n: NzI18nService) { }

  ngOnInit(): void {
  }

  resetVariables(){
    this.resetVisibility.emit(false);
  }

  handleOk(): void {
    this.resetVariables();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetVariables();
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  // getWeek(result: Date): void {
  //   console.log('week: ', getISOWeek(result));
  // }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
  }
}
