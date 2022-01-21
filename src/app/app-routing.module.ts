import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestUiComponent} from "./ui/guest-ui/guest-ui.component";
import {interfaceComponent} from "./interface/interface.component";
import {FrontofficeComponent} from "./frontoffice/frontoffice.component";
import {KitchenComponent} from "./kitchen/kitchen.component";
import {Kitchen2Component} from "./kitchen2/kitchen2.component";

const routes: Routes = [
  {
    path: '',
    component: GuestUiComponent
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
    component: KitchenComponent
  },
  {
    path: 'kitchen2',
    component: Kitchen2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
