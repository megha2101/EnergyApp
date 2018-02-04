import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProjectPage } from '../../pages/add-project/add-project';

@Component({
  selector: 'fab-icon',
  templateUrl: 'fab-icon.html'
})
export class FabIconComponent {

  text: string;

  constructor(public navCtrl: NavController) {
  }

  goToAddProjectPage(){
    this.navCtrl.push(AddProjectPage);
  }

}
