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
  selector: 'app-favourite-card',
  templateUrl: './favourite-card.component.html',
  styleUrls: ['./favourite-card.component.css']
})
export class FavouriteCardComponent implements OnInit {

  @Input()
  protein:any;

  @Input()
  toast:any;

  @Input()
  hashBrown:any;

  @Input()
  eggAvailable:any;

  @Input()
  eggStyle:any;

  @Input()
  title:any;

  @Input()
  image:any;

  @Input()
  itemIndex:any

  @Output()deleteItemIndex= new EventEmitter<any>();
  @Output() cart = new EventEmitter<any>();
  @Output() visibleCart= new EventEmitter<any>();

  visible: boolean = false;
  cartItem: cartItems[] = [];
  constructor() { }

  ngOnInit(): void {
  }


  clickMe(): void {
    // this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  deleteItem(){
    this.deleteItemIndex.emit(this.itemIndex);
  }

  addCartItem(){
    this.cartItem.push({
      category: this.title,
      hashbrown: this.hashBrown,
      protien: this.protein,
      toast: this.toast,
      eggstyle: this.eggStyle,
      qty: 1
    })
    this.cart.emit(this.cartItem);
    this.visibleCart.emit(true);
    for (let i=0;i<this.cartItem.length;){
      this.cartItem.splice(0);
    }
    console.log(this.cartItem);
  }
}
