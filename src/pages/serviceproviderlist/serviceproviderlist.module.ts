import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceproviderlistPage } from './serviceproviderlist';

@NgModule({
  declarations: [
    ServiceproviderlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceproviderlistPage),
  ],
})
export class ServiceproviderlistPageModule {}
