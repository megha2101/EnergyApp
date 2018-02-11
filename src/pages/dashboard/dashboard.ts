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
            location: ['', Validators.compose([ Validators.required])],
            electConsumption: ['', Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
            electConsumptionUnit: ['kWh'],
            occupancy: ['', Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
            area: ['', Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
            areaUnit: ['sqft'],
            //electricity_provider: ['electricityProviderSelect', Validators.compose([Validators.required])],
          });
    }

    logIn(){
      this.navCtrl.push(LoginPage);
    }
    // , "electricity_provider": this.basicInformationForm.get('electricity_provider').value
    setAllItems(){
      this.storage.set(this.sharedService.basicInformation, {"location": this.basicInformationForm.get('location').value, "electConsumption": this.basicInformationForm.get('electConsumption').value,
      "no_of_persons": this.basicInformationForm.get('occupancy').value})
      .then(()=>{ 
        console.log('Stored item!' + this.sharedService.basicInformation);
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
