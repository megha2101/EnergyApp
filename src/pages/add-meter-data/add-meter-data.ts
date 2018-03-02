import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SourcePage } from '../source/source';

@IonicPage()
@Component({
  selector: 'page-add-meter-data',
  templateUrl: 'add-meter-data.html',
})
export class AddMeterDataPage {

  myStartDate= moment().format(); //To show the default date
  myEndDate= moment().format();
  addMeterReadingForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.addMeterReadingForm = formBuilder.group({
        startDate: [''],
        endDate: [''],
        reading: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    
  }
  save(){
    this.submitAttempt = true;
        if(!this.addMeterReadingForm.valid){      
        }
        else {        
          this.navCtrl.pop();
        }
  }

}
