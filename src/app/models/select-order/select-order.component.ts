import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface cartItems {
    category: string;
    qty: number;
    protien: string;
    toast: string;
    hashbrown: string;
    eggstyle: string;
}

interface favouriteItems {
    category: string;
    protien: string;
    toast: string;
    hashbrown: string;
    eggstyle: string;
    image: string;
    eggAvailable: any;
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
    isVisible2 = false;

    @Input()
    orderTitle: any;

    @Output() visibility = new EventEmitter<boolean>();
    @Output() visibleCart = new EventEmitter<boolean>();
    @Output() cart = new EventEmitter<any>();
    @Output() setPreview = new EventEmitter<any>();
    @Output() setFavourIteList = new EventEmitter<any>();

    public myInnerWidth: any;
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
    cartItem: cartItems[] = [];
    favouriteItemList: favouriteItems[] = [];

    protien = '';
    hash = "No";
    toast = '';
    eggstyle = "N/A";
    image: any;
    isEggsAvailable = 0;

    activeFavourite = 0;

    showAlert = false;
    alertType=0;

    constructor() {
    }

    ngOnInit(): void {
        this.myInnerWidth = window.innerWidth;
    }

    changeBrownbread(b: boolean) {
        this.Brownbread = b;
        if (this.Brownbread) {
            this.Whitebread = false;
            this.toast = "Brownbread";
        }else{
            this.toast="";
        }
    }

    changeWhitebread(b: boolean) {
        this.Whitebread = b;
        if (this.Whitebread) {
            this.Brownbread = false;
            this.toast = "Whitebread";
        }else{
            this.toast="";
        }
    }

    changeSunny(b: boolean) {
        this.sunny = b;
        if (this.sunny) {
            this.over = false;
            this.scrambled = false;
            this.eggstyle = "Sunny Sideup";
        }else{
            this.eggstyle="N/A";
        }
    }

    changeOver(b: boolean) {
        this.over = b;
        if (this.over) {
            this.sunny = false;
            this.scrambled = false;
            this.eggstyle = "Sunny Sideup"
        }else {
            this.eggstyle="N/A";
        }
    }

    changeScrambled(b: boolean) {
        this.scrambled = b;
        if (this.scrambled) {
            this.sunny = false;
            this.over = false;
            this.eggstyle = "Scrambled";
        }else {
            this.eggstyle="N/A";
        }
    }

    changeSausage(b: boolean) {
        this.sausage = b;
        if (this.sausage) {
            this.bacon = false;
            this.extra_egg = false;
            this.protien = "Sausage";
        }else{
            this.protien="";
        }
    }

    changeExtraEgg(b: boolean) {
        this.extra_egg = b;
        if (this.extra_egg) {
            this.bacon = false;
            this.sausage = false;
            this.protien = "Sausage";
        }else {
            this.protien="";
        }
    }

    changeBacon(b: boolean) {
        this.bacon = b;
        if (this.bacon) {
            this.sausage = false;
            this.extra_egg = false;
            this.protien = "Bacon";
        }else {
            this.protien="";
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
    }

    handleCancel1(): void {
        this.isVisible2 = false;
        this.visibility.emit(this.isVisible2);
        this.resetItems();
        this.clearVariables();
    }

    handleOk(cate: any): void {
        this.isVisible = true;
        if (this.hash != "" && this.protien != "" && this.toast != "" && this.eggstyle != "") {

            this.cartItem.push({
                category: this.orderTitle,
                hashbrown: this.hash,
                protien: this.protien,
                toast: this.toast,
                eggstyle: this.eggstyle,
                qty: 1
            })
            this.resetItems();
            this.isVisible2 = false;
            this.visibleCart.emit(true);
            this.visibility.emit(this.isVisible2);
            this.cart.emit(this.cartItem);
            this.clearVariables();
            this.setPreview.emit(0);
        } else {
            this.showAlert = true;
        }
    }

    addToFavourite() {
        if (this.activeFavourite === 0) {
            if (this.hash != "" && this.protien != "" && this.toast != "" && this.eggstyle != "") {
                this.showAlert=false;
                this.alertType=0;
                if (this.ShowModel === 5) {
                    this.isEggsAvailable = 1;
                }
                if (this.orderTitle === 'Egg & Cheese Sandwich') {
                    this.image = "../../../assets/categories/egg and cheese sandwich.png"
                } else if (this.orderTitle === 'Pancake') {
                    this.image = "../../../assets/categories/pancake.png"
                } else if (this.orderTitle === 'Eggs') {
                    this.image = "../../../assets/categories/eggs.png"
                } else if (this.orderTitle === 'Cheese Omelette') {
                    this.image = "../../../assets/categories/cheese omlette.png"
                } else {
                    this.image = "../../../assets/categories/french toast.png"
                }
                this.favouriteItemList.push({
                    category: this.orderTitle,
                    hashbrown: this.hash,
                    protien: this.protien,
                    toast: this.toast,
                    eggstyle: this.eggstyle,
                    image: this.image,
                    eggAvailable: this.isEggsAvailable
                });
                this.activeFavourite = 1;
                this.setFavourIteList.emit(this.favouriteItemList);
            }else{
                this.alertType=1;
                this.showAlert=true;
                let favouriteButton:any;
                favouriteButton=document.getElementById('favourite');
                favouriteButton.click;
            }
        } else {
            this.activeFavourite = 0
            this.favouriteItemList.splice(this.favouriteItemList.length - 1);
        }

    }
}
