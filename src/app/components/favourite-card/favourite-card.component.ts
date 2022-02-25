import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GuestService} from "../../Services/guest.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
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

  @Input()
  ItemId:any;

  @Output()deleteItemIndex= new EventEmitter<any>();
  @Output() cart = new EventEmitter<any>();
  @Output() visibleCart= new EventEmitter<any>();
  @Output() reFreshFavouriteList=new EventEmitter<any>();


  visible: boolean = false;
  cartItem: cartItems[] = [];
  constructor(private guestService:GuestService,private message: NzMessageService,private modal: NzModalService) { }

  ngOnInit(): void {
    if (this.title === 'Egg & Cheese Sandwich') {
      this.image = "assets/categories/egg and cheese sandwich.png"
    } else if (this.title === 'Pancake') {
      this.image = "assets/categories/pancake.png"
    } else if (this.title === 'Eggs') {
      this.eggAvailable=1;
      this.image = "assets/categories/eggs.png"
    } else if (this.title === 'Cheese Omelette') {
      this.image = "assets/categories/cheese omlette.png"
    } else {
      this.image = "assets/categories/french toast.png"
    }
  }

  clickMe(): void {
    // this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  deleteItem(){
    this.modal.confirm({
      nzTitle: '<i>Confirm Remove</i>',
      nzContent: '<b><p>Are You Sure Want To Delete This Item From Your Favourite</p></b>',
      nzOnOk: () =>this.deleteFavourite()
    });
  }

  deleteFavourite(){
    this.guestService.removeFavourite(this.ItemId).subscribe(response=>{
      console.log(response);
      if(response===true){
        this.createMessage('success','This item removed from your Favourites');
        this.reFreshFavouriteList.emit(true);
      }else{
        this.createMessage('warning','something went wrong')
      }
    });
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

  createMessage(type: string,message:string): void {
    this.message.create(type, message);
  }
}
