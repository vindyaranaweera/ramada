import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestUiComponent } from './ui/guest-ui/guest-ui.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";
import { CategoryCardComponent } from './components/category-card/category-card.component';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAffixModule} from "ng-zorro-antd/affix";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzMentionModule} from "ng-zorro-antd/mention";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzResultModule} from "ng-zorro-antd/result";
import {interfaceComponent} from "./interface/interface.component";
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzAlertModule} from "ng-zorro-antd/alert";
import { RoomCardComponent } from './components/room-card/room-card.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import { OrderCardComponent } from './components/order-card/order-card.component';
import {NzTableModule} from "ng-zorro-antd/table";
import { KitchenComponent } from './kitchen/kitchen.component';
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzSwitchModule} from "ng-zorro-antd/switch";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GuestUiComponent,
    CategoryCardComponent,
    interfaceComponent,
    FrontofficeComponent,
    RoomCardComponent,
    OrderCardComponent,
    KitchenComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzGridModule,
        NzDividerModule,
        NzCardModule,
        NzTypographyModule,
        NzIconModule,
        NzAffixModule,
        NzButtonModule,
        NzBadgeModule,
        NzAvatarModule,
        NzModalModule,
        NzInputNumberModule,
        NzMentionModule,
        NzInputModule,
        NzResultModule,
        NzLayoutModule,
        NzAlertModule,
        NzDescriptionsModule,
        NzTableModule,
        NzTimePickerModule,
        NzDropDownModule,
        NzSelectModule,
        NzRateModule,
        NzSwitchModule
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
