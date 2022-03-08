import {Component, HostListener, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FormControl, Validators} from "@angular/forms";
import {ro_RO} from "ng-zorro-antd/i18n";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {GuestService} from "../../Services/guest.service";

interface cartItems {
  category: string;
  qty: number;
  protien: string;
  toast: string;
  hashbrown: string;
  egg_style: string;
}

@Component({
  selector: 'app-guest-ui',
  templateUrl: './guest-ui.component.html',
  styleUrls: ['./guest-ui.component.css']
})
export class GuestUiComponent implements OnInit {

  isPreview = 0;
  cartItem: cartItems[] = [];
  showSendtokitchen = 1;
  showDelete = 1;
  panel = 1;
  cart: cartItems[] = [];
  totalQuantity = 0;
  isVisible: boolean = false;
  isVisible2 = false;
  suggestions: any;
  buttonText: any;

  favouriteList: any = [];
  favouriteImagePath = "../../../ramada/assets/categories/"

  time: any;
  private myWindow: any;
  fIcon = 0;
  protien = '';
  hash = '';
  toast = '';
  eggstyle = '';
  isVisible3 = false;
  password: any;
  orderTitle: any;

  visibleCart: any;
  visibleOrderHistory: any;

  bacon: boolean = false;
  sausage: boolean = false;
  extra_egg: boolean = false;
  brownbread: boolean = false;
  whitebread: boolean = false;
  hashbrown: boolean = false;
  sunny: boolean = false;
  over: boolean = false;
  scrambled: boolean = false;
  private router: any;
  currentTime: Date | null = new Date();
  right_now_enable = false;

  public myInnerWidth: any;
  showSide: any = 0;
  public getScreenWidth: any;
  public getScreenHeight: any;

  passwordVisible: any;
  Brownbread: any;
  Whitebread: any;
  Hashbrown: any;
  myForm: any;

  getValueInRoute: any;
  bookingId: any;
  guestId: any;
  totalPacks: any;
  totalOrders: any;

  editOrderList: any
  otherDetailsList: any;

  constructor(private guestService: GuestService, public getPRoute: ActivatedRoute, private message: NzMessageService, private modal: NzModalService, router: Router, public datepipe: DatePipe) {
    this.router = router;

  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.myInnerWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log(new Date().getHours() + 'sdfsdf');
    if (new Date().getHours() > 3 && new Date().getHours() < 9) {
      this.right_now_enable = true;
      console.log('condition true')
    }

    this.getValueInRoute = this.getPRoute.params.subscribe(params => {
      this.bookingId = params['bookingId'];
    });
    this.getBookingDetails();
    this.setTotalOrders();
    setInterval(() => {
      this.setTotalOrders();
    }, 2000);
  }

  changeItemPanel(number: number) {
    console.log(this.otherDetailsList);
    this.panel = number;
    this.isVisible2 = true;
    this.editOrderList=null;
    this.otherDetailsList=null;
    if (number === 1) {
      this.orderTitle = "Cheese Omelette"
    }
    if (number === 2) {
      this.orderTitle = "Pancake"
    }
    if (number === 3) {
      this.orderTitle = "Egg & Cheese Sandwich"
    }
    if (number === 4) {
      this.orderTitle = "French Toast"
    }
    if (number === 5) {
      this.orderTitle = "Eggs"
    }
  }

  handleOk(cate: any): void {
    this.isVisible = true;
    console.log(this.cart);
    console.log('Button ok clicked!');
    if (cate === 'Pancake') {
      this.click(cate, '', '', this.hash, '');
    } else if (cate === 'Cheese Omelette') {
      this.click(cate, '', '', this.hash, '');
    } else if (cate === 'Egg And Cheese Sandwich') {
      this.click(cate, '', '', this.hash, '');
    } else if (cate === 'French Toast') {
      this.click(cate, '', '', this.hash, '');
    } else if (cate === 'Eggs') {
      this.click(cate, '', '', this.hash, '');
    }
    this.isVisible2 = false;
    alert('YOU HAVE 2 ORDERS LEFT!')
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.myInnerWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    // alert(this.getScreenWidth);
  }

  click(category: string, protein: string, toast: string, hashbrown: string, eggstyle: string) {
    let found = false;
    this.cart.push({
      category: category,
      qty: 1,
      protien: this.getProtien(),
      toast: this.getToast(category),
      hashbrown: this.getHashbrown(),
      egg_style: this.getEgg(category),
    });
    console.log(this.cart);
    this.updateTotalQty();
  }

  showCart() {
    this.showDelete = 0;
    this.showSendtokitchen = 0;
    this.isVisible = true;
    console.log(this.cart);
  }

  hideCart(visibility: boolean) {
    this.visibleCart = visibility;
  }

  sendToKitchen() {
    this.isVisible = false;
    alert('MAKE SURE TIME WAS SELECTED!')
  }

  removeQty(i: any) {
    let index = this.cart.indexOf(i);
    if (i.qty === 1) {
      this.modal.confirm({
        nzTitle: '<i>Do you Want to delete this item?</i>',
        nzContent: i.item + '<b> will be remove from your cart!</b>',
        nzOnOk: () => {
          this.cart.splice(index);
          this.updateTotalQty();
        },
        nzOnCancel: () => {

        }
      });
    } else {
      this.cart[index].qty--;
    }
  }

  addQty(i: any) {
    let index = this.cart.indexOf(i);
    if (i.qty === 2) {
      this.modal.confirm({
        nzTitle: '<i>Sorry!</i>',
        nzContent: '<b> You can not order more than 2 portions.</b>',
      });
    } else {
      this.cart[index].qty++;
      this.updateTotalQty();
    }
  }

  private updateTotalQty() {
    this.totalQuantity = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalQuantity = (this.totalQuantity + this.cart[i].qty);
    }
    if (this.totalQuantity === 0) {
      this.buttonText = "Back to Items";
    } else {
      this.buttonText = "Send To Kitchen";
    }
  }

  deleteQty(i: any) {
    let index = this.cart.indexOf(i);
    this.modal.confirm({
      nzTitle: '<i>Your Item Has Been Removed!</i>',
      nzContent: i.category + '<b> Will be Remove from your Cart!</b>',
      nzOnOk: () => {
        this.cart.splice(index, 1);
        this.updateTotalQty();
      },
      nzOnCancel: () => {

      }
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    // if(this.showDelete===0){
    //   this.showDelete=1;
    // }

  }

  handleCancel1(visibility: boolean): void {
    this.isVisible2 = visibility

  }

  addToFavourite() {
    if (this.fIcon === 0) {
      this.fIcon = 1
    } else {
      this.fIcon = 0;
    }
  }

  showModal(): void {
    this.isVisible3 = true;
  }

  handleOk2(): void {
    this.isVisible3 = false;
    console.log(this.password);
    if (this.password === '1234') {
      this.router.navigate(['kitchen']);
    } else if (this.password === '5678') {

      this.router.navigate(['frontoffice']);
    }
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible3 = false;
  }

  changeBacon(b: boolean) {
    this.bacon = b;
    if (this.bacon) {
      this.sausage = false;
      this.extra_egg = false;
    }
  }

  changeSausage(b: boolean) {
    this.sausage = b;
    if (this.sausage) {
      this.bacon = false;
      this.extra_egg = false;
    }
  }

  changeExtraEgg(b: boolean) {
    this.extra_egg = b;
    if (this.extra_egg) {
      this.bacon = false;
      this.sausage = false;
    }
  }

  changeHashbrown(b: boolean) {
    this.hashbrown = b;
    // if (this.hashbrown) {
    //   this.hashbrown = false;
    // }
  }

  private getProtien() {
    if (this.bacon) {
      return 'Bacon';
    } else if (this.sausage) {
      return 'Sausage';
    } else if (this.extra_egg) {
      return 'Extra Egg';
    } else {
      alert('Please select protien');
      return '';
    }
  }

  private getToast(category: string) {
    if (category === 'Pancake') {
      return 'N/A';
    }
    if (this.Brownbread) {
      return 'Brown';
    } else if (this.Whitebread) {
      return 'White';
    } else {
      alert('Please select Toast');
      return '';
    }
  }

  private getHashbrown() {
    if (this.hashbrown) {
      return 'Yes';
    }
    return 'No';
  }

  private getEgg(category: string) {
    if (category === 'Eggs') {
      if (this.sunny) {
        return 'Sunny';
      } else if (this.over) {
        return 'Over';
      } else if (this.scrambled) {
        return 'Scrambled';
      } else {
        alert('Please select Egg Style');
        return '';
      }
    } else {
      return 'N/A';
    }
  }

  changeBrownbread(b: boolean) {
    this.Brownbread = b;
    if (this.Brownbread) {
      this.Whitebread = false;
    }
  }

  changeWhitebread(b: boolean) {
    this.Whitebread = b;
    if (this.Whitebread) {
      this.Brownbread = false;
    }
  }

  changeSunny(b: boolean) {
    this.sunny = b;
    if (this.sunny) {
      this.over = false;
    }
  }

  changeOver(b: boolean) {
    this.over = b;
    if (this.over) {
      this.sunny = false;
      this.scrambled = false;
    }
  }

  changeScrambled(b: boolean) {
    this.scrambled = b;
    if (this.scrambled) {
      this.sunny = false;
      this.over = false;

    }
  }

  setCartItem(item: any) {
    for (let i = 0; i < item.length; i++) {
      this.cartItem.push({
        category: (item[i].category),
        qty: (item[i].qty),
        toast: (item[i].toast),
        egg_style: (item[i].egg_style),
        protien: (item[i].protien),
        hashbrown: (item[i].hashbrown)
      });
    }
    console.log(item)
    console.log(this.cartItem)
  }

  showOrderHistory() {
    this.visibleOrderHistory = true;
  }

  createErrorMessage(type: string): void {
    this.message.create(type, `this not working currently`);
  }

  addFavouriteList(favouriteItem: any) {
    this.favouriteList = favouriteItem;
    console.log(this.favouriteList);
  }

  deleteFavouriteItem(itemIndex: any) {
    this.favouriteList.splice(itemIndex, 1);
  }

  clickSide() {
    if (this.showSide === 0) {
      this.showSide = 1;
    } else {
      this.showSide = 0;
    }
  }

  getBookingDetails() {
    this.guestService.getBookingDetails(this.bookingId).subscribe(response => {
      console.log(response);
      this.guestId = response.guest;
      this.totalPacks = response.packs;
      this.getFavouriteList();
    });
  }

  getFavouriteList() {
    this.guestService.getAllFavourites(this.guestId).subscribe(response => {
      console.log(response);
      this.favouriteList = response;
    });
  }

  reFreshFavouriteList(status: boolean) {
    if (status === true) {
      this.getFavouriteList();
    }
  }

  setOtherList(list: any) {
    this.otherDetailsList = list
  }

  editOrder(list: any) {
    for (let i=0; i<list.length;i++){
      if(list[i].category==="Cheese Omelette"){
        this.orderTitle = "Cheese Omelette"
        this.panel=1;
      }else if(list[i].category==="Pancake"){
        this.orderTitle = "Pancake"
        this.panel=2
      }else if (list[i].category==="Egg & Cheese Sandwich"){
        this.orderTitle = "Egg & Cheese Sandwich"
        this.panel=3
      }else if(list[i].category==="French Toast"){
        this.orderTitle = "French Toast"
        this.panel=4
      }else if(list[i].category==="Eggs"){
        this.orderTitle = "Eggs"
        this.panel=5
      }
    }
    console.log(this.otherDetailsList)
    this.editOrderList = list;
    this.isVisible2 = true;
  }

  setTotalOrders() {
    let date = this.datepipe.transform(new Date(), 'YYYY/MM/dd');
    this.guestService.setTotalOrders(this.bookingId, date).subscribe(response => {
      this.totalOrders = response.message

    });
  }

  logOut() {
    this.router.navigate([''])
  }

  notAvailable(text: any) {
    this.message.info(text + ' not available at the moment!');
  }
}





