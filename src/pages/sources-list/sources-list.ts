import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AddSourcePage } from '../add-source/add-source';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { SourcePage } from '../source/source';
import * as $ from 'jquery';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { DataInputServiceProvider } from '../../providers/data-input-service/data-input-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';



@IonicPage()
@Component({
  selector: 'page-sources-list',
  templateUrl: 'sources-list.html',
})
export class SourcesListPage {

    private meter1Chart   : AmChart;
    pageno                : any = 1;
    nextFlag              : boolean = true;
    custom_basic_config_header : any = {};
    meterLoaderFlag       : boolean = true;
   
    constructor(public navCtrl: NavController, public navParams: NavParams, private AmCharts: AmChartsService,
    public sharedService: SharedServiceProvider, public dataInputService: DataInputServiceProvider, public http: Http,
    public configService: ConfigServiceProvider, public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.sharedService.page_size = 2;
        this.sharedService.page_count = 1;
        this.sharedService.loading_more_meters = true;
        this.sharedService.mymetersArray = [];
        this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{
        });  
    }
    deleteMeter(meter, sharedService){
        this.meterLoaderFlag = false;
        this.custom_basic_config_header = 
            {
                data: {},
                headers: 
                {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": this.configService.subscription_key,
                    "Authorization": "Bearer " + this.configService.authToken
                }
            };
      
      this.http.delete(this.configService.basic_api_url + '/assets/LEED:'+ this.sharedService.selBuildObject.leed_id +'/meters/ID:'+meter.id + '/?recompute_score=1',  this.custom_basic_config_header).subscribe((data)=>
      {
          //this.sharedService.meterToDelete = undefined;
          //this.sharedService.meterToDeleteElem = undefined;
          //elem.meterDeleteLoader = undefined;
          for(var i=0;i<this.sharedService.dataInputMeters.results.length;i++)
          {
              if(this.sharedService.dataInputMeters.results[i].id == meter.id)
              {
                this.sharedService.mymetersArray = [];
                this.sharedService.mymeters = {};
                this.sharedService.dataInputMeters.results.splice(i, 1);
                this.sharedService.meters_on_screen = this.sharedService.dataInputMeters.results.length;
                this.sharedService.total_meters = parseInt(this.sharedService.total_meters) - 1;
                this.sharedService.mymeters =this.sharedService.dataInputMeters.results;
                this.meterLoaderFlag = true;
                for(var i = 0; i< this.sharedService.mymeters.length; i++){
                    this.sharedService.mymetersArray.push(this.sharedService.mymeters[i]);
                }  
                return;
              }
          }
      }); 

    }

    startDrawChart(meters){
      for(var i = 0; i< this.sharedService.mymeters.length; i++){
          if(this.sharedService.mymeters[i].readings.length > 0){
              this.sharedService.drawChart(this.sharedService.mymeters[i].id,  this.sharedService.mymeters[i].readings, '#D0DD3D', 'smoothedLine', this.sharedService.mymeters[i].native_unit);
          }else{
            this.sharedService.drawEmptyChart(this.sharedService.mymeters[i].id, '#D0DD3D', this.sharedService.mymeters[i].native_unit); 
        }
      }
      return;
    }

    meterListScroll(infiniteScroll){ 
      if(this.sharedService.loading_more_meters == false){
          infiniteScroll.complete();
          return;
        }else{
          //this.sharedService.loading_more_meters = true;
          this.sharedService.page_count += 1;
          this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{ 
              infiniteScroll.complete();
              console.log('Meter Page Loading completed');       
          });  
            
      }        
      
    }  
    goToAddSourcePage(){
      this.navCtrl.push(AddSourcePage);    
    }

    goToSourcePage(event, selMeter){
        this.navCtrl.push(SourcePage, {
            selMeterObj: selMeter,           
        });
    }

}

