import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOrganizationPage } from './new-organization';

@NgModule({
  declarations: [
    NewOrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOrganizationPage),
  ],
})
export class NewOrganizationPageModule {}
