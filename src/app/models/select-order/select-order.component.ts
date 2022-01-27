import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
interface cartItems {
  category: string;
  qty: number;
  protien: string;
  toast: string;
  hashbrown: string;
  eggstyle: string;
}
@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {

  @Input()
  ShowModel:any;

  @Input()
  isVisible2 = false;

  @Input()
  orderTitle:any;

  @Output() visibility = new EventEmitter<boolean>();
  @Output() visibleCart = new EventEmitter<boolean>();
  @Output() cart=new EventEmitter<any>();
  @Output() setPreview=new EventEmitter<any>();

  public myInnerWidth:any;
  isVisible: boolean = false;

  bacon: boolean = false;
  sausage: boolean = false;
  extra_egg: boolean = false;
  hashbrown: boolean = false;
  sunny: boolean = false;
  over: boolean = false;
  scrambled: boolean = false;

  Brownbread: any;
  Whitebread: any;
  Hashbrown: any;
  cartItem:cartItems[]=[];

  protien = '';
  hash = "No";
  toast = '';
  eggstyle = "N/A";

  showAlert=false;
  constructor() {  }

  ngOnInit(): void {
    this.myInnerWidth = window.innerWidth;
  }
  changeBrownbread(b: boolean) {
    this.Brownbread = b;
    if (this.Brownbread) {
      this.Whitebread = false;
      this.toast="Brownbread";
    }
  }

  changeWhitebread(b: boolean) {
    this.Whitebread = b;
    if (this.Whitebread) {
      this.Brownbread = false;
      this.toast="Whitebread";
    }
  }

  changeSunny(b: boolean) {
    this.sunny = b;
    if (this.sunny) {
      this.over = false;
      this.scrambled=false;
      this.eggstyle="Sunny Sideup";
    }
  }

  changeOver(b: boolean) {
    this.over = b;
    if (this.over) {
      this.sunny = false;
      this.scrambled = false;
      this.eggstyle="Sunny Sideup"
    }
  }

  changeScrambled(b: boolean) {
    this.scrambled = b;
    if (this.scrambled) {
      this.sunny = false;
      this.over = false;
      this.eggstyle="Scrambled";
    }
  }

  changeSausage(b: boolean) {
    this.sausage = b;
    if (this.sausage) {
      this.bacon = false;
      this.extra_egg = false;
      this.protien="Sausage";
    }
  }

  changeExtraEgg(b: boolean) {
    this.extra_egg = b;
    if (this.extra_egg) {
      this.bacon = false;
      this.sausage = false;
      this.protien="Sausage";
    }
  }

  changeBacon(b: boolean) {
    this.bacon = b;
    if (this.bacon) {
      this.sausage = false;
      this.extra_egg = false;
      this.protien="Bacon";
    }
  }

  changeHashbrown(b: boolean) {
    this.hashbrown = b;
    if (this.hashbrown) {
      this.hash="Yes";
    }else {
      this.hash="N/A";
    }
  }

  handleCancel(): void {
    this.resetItems();
    this.isVisible2 = false;
    this.visibility.emit(this.isVisible2);
  }

  resetItems(){
    this.bacon= false;
    this.sausage= false;
    this.extra_egg= false;
    this.hashbrown= false;
    this.sunny= false;
    this.over= false;
    this.scrambled= false;
    this.Whitebread=false;
    this.showAlert=false;
    this.Brownbread=false;
  }
  clearVariables(){
    this.protien = '';
    this.hash = "No";
    this.toast = '';
    this.eggstyle = "N/A";
  }
  handleCancel1():void {
    this.isVisible2 = false;
    this.visibility.emit(this.isVisible2);
    this.resetItems();
  }

  handleOk(cate: any): void {
    this.isVisible = true;
    if(this.hash!=""&& this.protien!="" && this.toast!=""&&this.eggstyle!=""){

      this.cartItem.push({
        category:this.orderTitle,
        hashbrown:this.hash,
        protien:this.protien,
        toast:this.toast,
        eggstyle:this.eggstyle,
        qty:1
      })
      this.resetItems();
      this.isVisible2 = false;
      this.visibleCart.emit(true);
      this.visibility.emit(this.isVisible2);
      this.cart.emit(this.cartItem);
      this.clearVariables();
      this.setPreview.emit(0);
    }else{
     this.showAlert=true;
    }
  }
}
