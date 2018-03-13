import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourcePage } from '../source/source';
import { ProjectDetailsPage } from '../project-details/project-details';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { MeterDataServiceProvider } from '../../providers/meter-data-service/meter-data-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { SourcesListPage } from '../sources-list/sources-list';

@IonicPage()
@Component({
  selector: 'page-add-source',
  templateUrl: 'add-source.html',
})
export class AddSourcePage {

  addMeterForm: FormGroup;
  submitAttempt: boolean = false;
  meterName: any;
  type: any;
  add_meter_ajax: boolean = false;
  showManualList : boolean = false;
  selected_meter_type: any = 'ELECTRICITY';
  selected_unit : any = 'kWh';
  selected_color: any = '#D0DD3D';
  selected_fuel_type: any = 'Purchased from Grid';
  selected_fuel_type_id: any  = '25';
  selected_fuel_subtype: any  = '';
  selected_meter_id: any = '0';
  addedMeters: any = [];
  postData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public sharedService: SharedServiceProvider,
  public meterService: MeterDataServiceProvider, public configService: ConfigServiceProvider) {
    this.addMeterForm = formBuilder.group({
        meterName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        meterUnit:['kWh'],
        fuelSource:['Purchased from Grid']
    });
}


  addNewMeter(){        
    this.meterName       = this.addMeterForm.get('meterName').value;
    this.selected_unit   = this.addMeterForm.get('meterUnit').value;
    this.add_meter_ajax = true;
    this.showManualList = true;
    this.postData = 
    {
        name:  this.meterName, 
        native_unit:  this.selected_unit, 
        type: this.selected_fuel_type_id
    };

    this.meterService.createMeter(this.configService, this.sharedService.config_header_new, this.sharedService.selBuildObject.leed_id, this.postData).subscribe((data) =>{
        data['readings'] = [];
        this.selected_meter_id = data.id;
        data['energystar'] = false;
        
        if(this.selected_meter_type == 'WATER')
        {            
        }
        else
        {           
            if(data.fuel_type.kind.toLowerCase() == 'electricity')
            {
                if(data.fuel_type.id != 46)
                {
                    data.fuel_type.type = 'Purchased from Grid'
                }
            }            
            this.sharedService.dataInputMeters.results.unshift(data);
            this.sharedService.total_meters = parseInt(this.sharedService.total_meters) + 1;
        }
        
        this.addedMeters.push(data);
        //this.add_meter_ajax = false;
        //this.sharedService.syncNotifications(data.fuel_type.kind);        
        this.sharedService.meters_on_screen = parseInt(this.sharedService.meters_on_screen) + 1;
        this.meterName = '';
    },
    err => {
        //this.add_meter_ajax = false;
    },
    () => {
      console.log('pop the page'),
      this.navCtrl.pop();
    }

    );     

}

addMeter(){
  this.submitAttempt = true;
  if(!this.addMeterForm.valid){      
  }
  else {
    console.log('Stored item!');
    this.addNewMeter();
  } 
}

}
