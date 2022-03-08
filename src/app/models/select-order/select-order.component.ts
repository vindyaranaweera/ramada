import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GuestService} from "../../Services/guest.service";
import {NzMessageService} from "ng-zorro-antd/message";

interface cartItems {
  category: string;
  qty: number;
  protien: string;
  toast: string;
  hashbrown: string;
  egg_style: string;
}

interface favouriteItems {
  category: string;
  protien: string;
  toast: string;
  hashbrown: string;
  eggstyle: string;
  image: string;
  // eggAvailable: any;
}

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {

  @Input()
  ShowModel: any;

  @Input()
  guestId: any;

  @Input()
  isVisible2 = false;

  @Input()
  orderTitle: any;

  @Input()
  editOrder: cartItems[]|null = []

  @Input()
  otherDetailsList:any;

  @Output() visibility = new EventEmitter<boolean>();
  @Output() visibleCart = new EventEmitter<boolean>();
  @Output() cart = new EventEmitter<any>();
  @Output() setPreview = new EventEmitter<any>();
  @Output() setFavourIteList = new EventEmitter<any>();
  @Output() reFreshFavouriteList = new EventEmitter<any>();
  @Output() sendOtherDetailsList=new EventEmitter<any>();

  public myInnerWidth: any;
  isVisible: boolean = false;

  bacon: boolean = false;
  sausage: boolean = false;
  extra_egg: boolean = false;
  hashbrown: boolean = false;
  sunny: boolean = false;
  over: boolean = false;
  scrambled: boolean = false;
  overhard:boolean=false;
  qty = 1;

  Brownbread: any;
  Whitebread: any;
  Hashbrown: any;
  cartItem: cartItems[] = [];
  favouriteItemList: favouriteItems[] = [];

  protien = '';
  hash = "No";
  toast = '';
  eggstyle = "N/A";
  image: any;
  isEggsAvailable = 0;
  favouriteId: number = 0;

  activeFavourite = 0;

  showAlert = false;
  alertType = 0;


  constructor(private guestService: GuestService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.myInnerWidth = window.innerWidth;
    this.setExistingOrderDetails();
  }

  changeBrownbread(b: boolean) {
    this.Brownbread = b;
    if (this.Brownbread) {
      this.Whitebread = false;
      this.toast = "Brownbread";
    } else {
      this.toast = "";
    }
  }

  changeWhitebread(b: boolean) {
    this.Whitebread = b;
    if (this.Whitebread) {
      this.Brownbread = false;
      this.toast = "Whitebread";
    } else {
      this.toast = "";
    }
  }

  changeSunny(b: boolean) {
    this.sunny = b;
    if (this.sunny) {
      this.over = false;
      this.scrambled = false;
      this.overhard=false;
      this.eggstyle = "Sunny Sideup";
    } else {
      this.eggstyle = "N/A";
    }
  }

  changeOver(b: boolean) {
    this.over = b;
    if (this.over) {
      this.sunny = false;
      this.scrambled = false;
      this.overhard=false;
      this.eggstyle = "OverEasy"
    } else {
      this.eggstyle = "N/A";
    }
  }

  changeScrambled(b: boolean) {
    this.scrambled = b;
    if (this.scrambled) {
      this.sunny = false;
      this.over = false;
      this.overhard=false;
      this.eggstyle = "Scrambled";
    } else {
      this.eggstyle = "N/A";
    }
  }

  changeOverHard(b: boolean) {
    this.overhard = b;
    if (this.overhard) {
      this.sunny = false;
      this.scrambled = false;
      this.over=false;
      this.eggstyle = "OverHard"
    } else {
      this.eggstyle = "N/A";
    }
  }

  changeSausage(b: boolean) {
    this.sausage = b;
    if (this.sausage) {
      this.bacon = false;
      this.extra_egg = false;
      this.protien = "Sausage";
    } else {
      this.protien = "";
    }
  }

  changeExtraEgg(b: boolean) {
    this.extra_egg = b;
    if (this.extra_egg) {
      this.bacon = false;
      this.sausage = false;
      this.protien = "Extra Egg";
    } else {
      this.protien = "";
    }
  }

  changeBacon(b: boolean) {
    this.bacon = b;
    if (this.bacon) {
      this.sausage = false;
      this.extra_egg = false;
      this.protien = "Bacon";
    } else {
      this.protien = "";
    }
  }

  changeHashbrown(b: boolean) {
    this.hashbrown = b;
    if (this.hashbrown) {
      this.hash = "Yes";
    } else {
      this.hash = "N/A";
    }
  }

  handleCancel(): void {
    this.resetItems();
    this.isVisible2 = false;
    this.visibility.emit(this.isVisible2);
    this.clearVariables();
  }

  resetItems() {
    this.bacon = false;
    this.sausage = false;
    this.extra_egg = false;
    this.hashbrown = false;
    this.sunny = false;
    this.over = false;
    this.scrambled = false;
    this.Whitebread = false;
    this.showAlert = false;
    this.Brownbread = false;
    this.activeFavourite = 0
  }

  clearVariables() {
    this.protien = '';
    this.hash = "No";
    this.toast = '';
    this.eggstyle = "N/A";
    this.image = '';
    this.isEggsAvailable = 0;
    for (let i = 0; i < this.cartItem.length;) {
      this.cartItem.splice(0);
    }
    if(this.editOrder!=null){
      for (let i = 0; i < this.editOrder.length;) {
        this.editOrder.splice(i);
      }
    }
    this.otherDetailsList=null;
  }

  handleCancel1(): void {
    this.isVisible2 = false;
    this.visibility.emit(this.isVisible2);
    this.resetItems();
    this.clearVariables();
  }

  handleOk(cate: any): void {
    this.isVisible = true;
    if (this.hash === "No" && this.protien === "" && this.toast === "" && this.eggstyle === "N/A") {
        this.showAlert = true;
    }else {
      this.cartItem.push({
        category: this.orderTitle,
        hashbrown: this.hash,
        protien: this.protien,
        toast: this.toast,
        egg_style: this.eggstyle,
        qty: 1
      })
      this.resetItems();
      this.isVisible2 = false;
      this.visibleCart.emit(true);
      this.visibility.emit(this.isVisible2);
      this.sendOtherDetailsList.emit(this.otherDetailsList);
      console.log(this.otherDetailsList);
      this.cart.emit(this.cartItem);
      this.clearVariables();
      this.setPreview.emit(0);
    }
    // } else {
    //   this.showAlert = true;
    // }
  }

  addToFavourite() {
    if (this.activeFavourite === 0) {
      if (this.hash != "" && this.protien != "" && this.toast != "" && this.eggstyle != "") {
        this.showAlert = false;
        this.alertType = 0;
        if (this.ShowModel === 5) {
          this.isEggsAvailable = 1;
        }
        this.saveFavourite();
        this.activeFavourite = 1;
      } else {
        this.alertType = 1;
        this.showAlert = true;
        let favouriteButton: any;
        favouriteButton = document.getElementById('favourite');
        favouriteButton.click;
      }
    } else {
      this.activeFavourite = 0
      this.deleteFavourite();
      this.reFreshFavouriteList.emit(true);
    }

  }

  saveFavourite() {
    let favouriteBody: any;
    favouriteBody = {
      category: this.orderTitle,
      protien: this.protien,
      toast: this.toast,
      hashbrown: this.hash,
      eggstyle: this.eggstyle,
      guest: this.guestId
    }
    this.guestService.addToFavourite(favouriteBody).subscribe(response => {
      console.log(response);
      this.favouriteId = parseInt(response.message);
      this.reFreshFavouriteList.emit(true);
      if (response.status === true) {
        this.createMessage('success', 'This item added to your Favourites')
      } else {
        this.createMessage('warning', 'something went wrong')
      }
    });
  }

  deleteFavourite() {
    this.guestService.removeFavourite(this.favouriteId).subscribe(response => {
      console.log(response);
      if (response === true) {
        this.createMessage('success', 'This item removed from your Favourites')
      } else {
        this.createMessage('warning', 'something went wrong')
      }
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  setExistingOrderDetails() {
    if(this.editOrder!=null){

      for (let i = 0; i < this.editOrder.length; i++) {
        this.orderTitle = this.editOrder[i].category;
        if (this.editOrder[i].toast === "Brownbread") {
          this.changeBrownbread(true);
        } else {
          this.changeWhitebread(true);
        }
        if (this.editOrder[i].protien === "Sausage") {
          this.changeSausage(true);
        } else if (this.editOrder[i].protien === "Extra Egg") {
          this.changeExtraEgg(true);
        } else {
          this.changeBacon(true);
        }
        if (this.editOrder[i].hashbrown === "Yes") {
          this.changeHashbrown(true);
        }
        if (this.editOrder[i].egg_style != "N/A") {
          if (this.editOrder[i].egg_style === "Sunny Sideup") {
            this.changeSunny(true)
          } else if (this.editOrder[i].egg_style === "OverEasy") {
            this.changeOver(true)
          } else {
            this.changeScrambled(true);
          }
        }
      }
    }

  }
}
// <button nz-button nzType="default" style="background-color: #D21241;border-color:#D21241; height: 50px;
// color: white;" (click)="sendToKitchen()" *ngIf="cartItem.length>0">Send To Kitchen
// </button>
// <button nz-button nzType="default" style="background-color: #D21241;border-color:#D21241; height: 50px;
// color: white;" (click)="backToItems()" *ngIf="cartItem.length<1">Back To Items
// </button>
