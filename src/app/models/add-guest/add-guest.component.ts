import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {FrontOfficeService} from "../../Services/front-office.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  @Input()
  isVisible = false;

  @Input()
  visibleType: any

  @Input()
  roomNo: any;

  @Output() resetVisibility = new EventEmitter<boolean>();

  isEnglish = false;
  //for check this guest vas exist or not
  guestWasExist = 0;

  //below variables fo get guest details
  getGuestId: any = null;
  getGuestName: any = null;
  getGuestContactNo: any = null;
  checkInDate = null;
  checkOutDate = null;
  guestDBId = 0;
  roomDBId: any;
  packs = 0;
  bookingId = 0;
  bookingStatus = 1;
  accessCode = 123;

  constructor(private i18n: NzI18nService, private frontOfficeService: FrontOfficeService, private modal: NzModalService) {
  }

  ngOnInit(): void {
  }

  resetGuestDetails() {
    this.getGuestName = null;
    this.getGuestContactNo = null;
    this.getGuestId = null;
    this.checkInDate = null;
    this.checkOutDate = null;
    this.guestDBId = 0;
    this.roomDBId = null;
    this.bookingStatus = 1;
    this.guestWasExist = 0;
    this.packs=0;

  }

  resetVariables() {
    this.resetGuestDetails()
    this.resetVisibility.emit(false);
  }

  searchGuest(key: any) {
    this.resetGuestDetails()
    this.frontOfficeService.findGuest(key).subscribe(response => {
      if (response != null) {
        this.guestDBId = response.id;
        this.getGuestName = response.name;
        this.getGuestContactNo = response.contactNumber;
        this.guestWasExist = 1;
      }
      console.log(response);
      console.log(this.roomNo);
      console.log(this.guestDBId);
    })

  }

  handleOk(): void {

    const guestBody = {
      id: this.guestDBId,
      name: this.getGuestName,
      contactNumber: this.getGuestContactNo,
      idNumber: this.getGuestId
    }
    this.frontOfficeService.saveGuest(guestBody).subscribe(response => {
      console.log(response);
      this.frontOfficeService.getRoomId(this.roomNo).subscribe(response => {
        this.roomDBId = response;
        console.log("room id :" + this.roomDBId);
        console.log("new kkkk : " + this.roomDBId);
        const BookingBody = {
          id: this.bookingId,
          checkindate: this.checkInDate,
          checkoutdate: this.checkOutDate,
          packs: this.packs,
          guest: this.guestDBId,
          room: this.roomDBId,
          status: this.bookingStatus,
          access_code: this.accessCode
        }
        console.log(BookingBody);
        this.frontOfficeService.addBooking(BookingBody).subscribe(response => {
          console.log(response);
          if(response.status===true){
            this.success("Booking Added Success",response.message);
          }else{
            this.error("Error",response.message);
          }
        });
        this.resetVariables();
      });
    });


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
    this.packs++;
  }

  minCount(): void {
    this.packs--;
    if (this.packs < 0) {
      this.packs = 0;
    }
  }

  success(status:any,message:any): void {
    this.modal.success({
      nzTitle: status,
      nzContent: message
    });
  }

  error(status:any,message:any): void {
    this.modal.error({
      nzTitle: status,
      nzContent: message
    });
  }
}
