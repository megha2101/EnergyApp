import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { AddMeterDataPage } from '../add-meter-data/add-meter-data';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';
import { MeterDataServiceProvider } from '../../providers/meter-data-service/meter-data-service';

@IonicPage()
@Component({
  selector: 'page-source',
  templateUrl: 'source.html',
})
export class SourcePage {

    public chart3: AmChart;

    constructor(public navCtrl: NavController, public navParams: NavParams,  private AmCharts: AmChartsService, 
    public sharedService: SharedServiceProvider, public configService: ConfigServiceProvider, public meterDataService: MeterDataServiceProvider) {
    }
    ngOnInit(){
        this.sharedService.selMeterObj = this.navParams.get('selMeterObj');
    }
  

    ionViewDidEnter(){ // to referesh the page on using pop() method
        if(this.sharedService.selMeterObj.readings.length > 0){
            this.sharedService.drawChart("meter", this.sharedService.selMeterObj.readings, '#D0DD3D', 'smoothedLine', this.sharedService.selMeterObj.native_unit);
        }else{
            this.sharedService.drawEmptyChart("meter", '#D0DD3D', this.sharedService.selMeterObj.native_unit); 
        }      
    }

   deleteMeterData(meter)
    {
        var custom_basic_config_header = 
        {
            data: {},
            headers: 
            {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": this.configService.subscription_key,
                "Authorization": "Bearer " + this.configService.authToken
            }
        };

        this.meterDataService.deleteMeterReading(meter, custom_basic_config_header).subscribe((data)=>{
          for(var i=0;i<this.sharedService.selMeterObj.readings.length;i++)
          {
              if(this.sharedService.selMeterObj.readings[i].id == meter.id)
              {
                this.sharedService.selMeterObj.readings.splice(i, 1);
                this.ionViewDidEnter();
              }
          }          
    
        },error=>
        {
           console.log("error in delete meter reading");
        });;
    }
    goToAddMeterDataPage(){
      this.navCtrl.push(AddMeterDataPage);
    }
  }
