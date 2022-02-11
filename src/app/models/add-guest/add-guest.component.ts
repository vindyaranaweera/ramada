import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {FrontOfficeService} from "../../Services/front-office.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {differenceInCalendarDays, setHours} from 'date-fns';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  @Input()
  bookingList: any[] = [];

  @Input()
  isVisible = false;

  @Input()
  visibleType: any

  @Input()
  roomNo: any;

  @Output() resetVisibility = new EventEmitter<boolean>();
  @Output() refreshRoomPage = new EventEmitter<any>();

  dateFormat = 'yyyy/MM/dd';
  today = new Date();

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
  packs = 1;
  bookingId:any = 0;
  bookingStatus = 1;
  accessCode = 123;

  constructor(private message: NzMessageService, private i18n: NzI18nService, private frontOfficeService: FrontOfficeService, private modal: NzModalService) {
  }


  ngOnInit(): void {
    const guestBody = {
      id: this.guestDBId,
      name: this.getGuestName,
      contactNumber: this.getGuestContactNo,
      idNumber: this.getGuestId
    }
    console.log(guestBody);
    this.setDetails();
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) < 0;

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
    this.packs = 0;

  }

  resetGuestDetails2(){
    this.getGuestName = null;
    this.getGuestContactNo = null;
    this.getGuestId = null;
    this.guestDBId = 0;
  }

  resetVariables() {
    this.resetGuestDetails()
    this.resetVisibility.emit(false);
  }

  searchGuest(key: any) {
    if(this.visibleType===0){
      this.resetGuestDetails2()
    }else{
      this.resetGuestDetails()
    }
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

    if (this.visibleType === 1) {
      this.checkInGuest();
    } else {
      this.UpdateGuest();
    }
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
  validateGuestDetails(): boolean {
    if ((this.getGuestId != null && this.getGuestId != "") && (this.getGuestName != null && this.getGuestName != "") && (this.getGuestContactNo != null && this.getGuestContactNo != "") && this.checkInDate != null && this.checkOutDate != null) {
      console.log(this.getGuestContactNo);
      return true;
    } else {
      if (this.getGuestId === null || this.getGuestId === "") {
        this.createMessage('error', 'please enter guest ID/Passport or Driving License card no')
      } else if (this.getGuestName === null || this.getGuestName === "") {
        this.createMessage('error', 'please enter guest name')
      } else if (this.getGuestContactNo === null || this.getGuestContactNo === "") {
        this.createMessage('error', 'please enter guest contact no')
      } else if (this.checkInDate === null) {
        this.createMessage('error', 'please enter check-In date')
      } else if (this.checkOutDate === null) {
        this.createMessage('error', 'please enter check-Out date')
      }
      return false
    }
  }

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

  success(status: any, message: any): void {
    this.modal.success({
      nzTitle: status,
      nzContent: "<b><h2 style='font-size: 30px; font-weight: bold; color: #d21241'>"+ message+"<h2/></b>"
    });
  }

  error(status: any, message: any): void {
    this.modal.error({
      nzTitle: status,
      nzContent: message
    });
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }

  //this for set already exist booking details
  setDetails() {
    if (this.visibleType === 0) {
      this.frontOfficeService.viewBooking(this.roomNo).subscribe(response => {
        console.log(response)
        this.bookingId = response.bookingId;
        this.bookingId = response.id;
        this.guestDBId = response.guest;
        console.log("sdfjsdifoj = " + this.guestDBId);
        this.checkInDate = response.checkindate;
        this.checkOutDate = response.checkoutdate;
        this.packs = response.packs;
        // console.log("get booking Id "+this.bookingId);
        this.bookingStatus = response.status;
        this.accessCode = response.access_code;
        this.roomDBId = response.room;
        this.frontOfficeService.getGuestByDBId(this.guestDBId).subscribe(response => {
          this.getGuestId = response.idNumber;
          this.getGuestName = response.name;
          this.getGuestContactNo = response.contactNumber;
        })
      })
    }
  }

  checkInGuest() {
    if (this.validateGuestDetails() === true) {
      const guestBody = {
        id: this.guestDBId,
        name: this.getGuestName,
        contactNumber: this.getGuestContactNo,
        idNumber: this.getGuestId
      }
      console.log(guestBody)
      this.frontOfficeService.saveGuest(guestBody).subscribe(response => {
        this.frontOfficeService.getRoomId(this.roomNo).subscribe(response => {
          console.log("reddvsv " + response)
          let BookingBody: any = {
            id: this.bookingId,
            checkindate: this.checkInDate,
            checkoutdate: this.checkOutDate,
            packs: this.packs,
            guest: this.guestDBId,
            room: response,
            status: this.bookingStatus,
            access_code: this.accessCode
          }
          console.log(BookingBody);
          this.frontOfficeService.addBooking(BookingBody).subscribe(response => {
            console.log(response);
            if (response.status === true) {
              this.success("Success ! Your Access code", response.message);
              this.refreshRoomPage.emit(true);
              console.log(this.refreshRoomPage)
            } else {
              this.error("Error", response.message);
            }
            this.resetVariables();
          });
        });
      });
    }
  }

  UpdateGuest() {
    if (this.validateGuestDetails() === true) {
      const guestBody = {
        id: this.guestDBId,
        name: this.getGuestName,
        contactNumber: this.getGuestContactNo,
        idNumber: this.getGuestId
      }
      console.log("boking id is " + this.bookingId);
      this.frontOfficeService.saveGuest(guestBody).subscribe(response => {
        this.frontOfficeService.getRoomId(this.roomNo).subscribe(response => {
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
          this.frontOfficeService.updateGuest(BookingBody).subscribe(response => {
            console.log(response);
            if (response.status === true) {
              this.success("Booking Update Success", response.message);
            } else {
              this.error("Error", response.message);
            }
            this.resetVariables();
          });
        });
      });
    }
  }

  checkOutGuest() {
    this.frontOfficeService.checkOutBooking(this.bookingId).subscribe(response=>{
      if(response.status===false){
        this.createMessage('error',response.message);
      }else{
        this.createMessage('success',response.message);
        this.refreshRoomPage.emit(true);
      }
      this.resetVariables();
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
