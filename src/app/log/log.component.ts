import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GuestService} from "../Services/guest.service";
import {userError} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";

interface user {
  "message": any,
  "accessType": any,
  "succeeded": any
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public User: user[] = [];

  password: any;
  public getScreenWidth: any;
  public getScreenHeight: any;
  passwordVisible = false;

  constructor(private router: Router, private guestService: GuestService,private message: NzMessageService) {
  }

  goToPage(): void {
    this.handlelogin();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  createMessage(type: string,message:string): void {
    this.message.create(type, ` ${message}`);
  }
  handlelogin(): void {

    this.guestService.checkLogin(this.password).subscribe(r => {
      console.log(r)
      console.log(r.succeeded);
      if (r.succeeded) {
        if (r.accessType === 1) {
          this.router.navigate(['frontoffice']);
          this.createMessage('success',r.message);
        } else if (r.accessType === 2) {
          this.router.navigate(['kitchen']);
          this.createMessage('success',r.message);
        } else if (r.accessType === 3) {
          this.router.navigate(['guestUi']);
          this.createMessage('success',r.message);
        }else {
          this.createMessage('error',r.message);
        }
      } else {
        this.createMessage('error',r.message);
      }
    });

  }

}
