import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSourcePage } from './add-source';

@NgModule({
  declarations: [
    AddSourcePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSourcePage),
  ],
})
export class AddSourcePageModule {}
