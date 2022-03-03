import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestUiComponent} from "./ui/guest-ui/guest-ui.component";
import {interfaceComponent} from "./interface/interface.component";
import {FrontofficeComponent} from "./frontoffice/frontoffice.component";
import {KitchenComponent} from "./kitchen/kitchen.component";
import {Kitchen2Component} from "./kitchen2/kitchen2.component";
import {LogComponent} from "./log/log.component";


const routes: Routes = [

  {
    path: '',
    component: LogComponent
  },
  {
    path: 'interface',
    component: interfaceComponent
  },
  {
    path: 'frontoffice',
    component: FrontofficeComponent
  },
  {
    path: 'kitchen',
    component: Kitchen2Component
  },
  {
    path: 'kitchen2',
    component: KitchenComponent
  },
  {
    path: 'guestUi/:bookingId',
    component: GuestUiComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
