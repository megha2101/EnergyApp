import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SourcesListPage } from './sources-list';

@NgModule({
  declarations: [
    SourcesListPage,
  ],
  imports: [
    IonicPageModule.forChild(SourcesListPage),
  ],
})
export class SourcesListPageModule {}
