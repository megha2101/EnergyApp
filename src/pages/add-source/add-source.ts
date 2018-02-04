import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourcePage } from '../source/source';
import { ProjectDetailsPage } from '../project-details/project-details';

@IonicPage()
@Component({
  selector: 'page-add-source',
  templateUrl: 'add-source.html',
})
export class AddSourcePage {

  addMeterForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.addMeterForm = formBuilder.group({
      meterName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      meterUnit:['kWh']
    });
}

addMeter(){
  this.submitAttempt = true;
  if(!this.addMeterForm.valid){      
  }
  else {
    console.log('Stored item!');
    this.navCtrl.pop();
    
  } 
}

}
