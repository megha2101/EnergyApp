import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMeterDataPage } from './add-meter-data';

@NgModule({
  declarations: [
    AddMeterDataPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMeterDataPage),
  ],
})
export class AddMeterDataPageModule {}
