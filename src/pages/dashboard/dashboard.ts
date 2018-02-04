import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalysisPage } from '../analysis/analysis';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

    basicInformationForm: FormGroup;
    electricityProviderSelectValue: any;
    informations: string;

  
    submitAttempt: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage,
    public sharedService: SharedServiceProvider) {
        this.basicInformationForm = formBuilder.group({
            location: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            electricity_consumption: ['', Validators.compose([Validators.maxLength(3),Validators.pattern('[0-9 ]*'), Validators.required])],
            number_persons: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[0-9 ]*'), Validators.required])],
            electricity_provider: ['electricityProviderSelect', Validators.compose([Validators.required])],
          });
    }

    logIn(){
      this.navCtrl.push(LoginPage);
    }

    setAllItems(){
      this.storage.set(this.sharedService.basicInformation, {"location": this.basicInformationForm.get('location').value , "electricity_consumption": this.basicInformationForm.get('electricity_consumption').value,
      "no_of_persons": this.basicInformationForm.get('number_persons').value, "electricity_provider": this.basicInformationForm.get('electricity_provider').value})
      .then(()=>{ 
        console.log('Stored item!' + this.informations);
        this.navCtrl.push(AnalysisPage);
        error => console.error('Error storing item', error)
      });
      
    }

    score(){
        this.submitAttempt = true;
        if(!this.basicInformationForm.valid){      
        }
        else {
          console.log('Stored item!');
          this.setAllItems();
        } 

    }

  }
