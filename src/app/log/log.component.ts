import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  password: any;
  public getScreenWidth: any;
  public getScreenHeight: any;
  passwordVisible = false;

  constructor(private router: Router) {
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
    // alert(this.getScreenWidth);
  }

  handlelogin(): void {
    console.log(this.password);
    if (this.password === '089') {
      this.router.navigate(['guestUi']);
    } else if (this.password === '001') {
      this.router.navigate(['frontoffice']);
    } else if (this.password === '999') {
      this.router.navigate(['kitchen']);
    }
  }
}
