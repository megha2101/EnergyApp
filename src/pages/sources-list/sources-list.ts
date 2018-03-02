import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
   
    constructor(public navCtrl: NavController, public navParams: NavParams, private AmCharts: AmChartsService,
    public sharedService: SharedServiceProvider, public dataInputService: DataInputServiceProvider,
    public configService: ConfigServiceProvider) {
    }

    ngOnInit() {
        this.sharedService.page_size = 2;
        this.sharedService.page_count = 1;
        this.sharedService.loading_more_meters = true;
        this.sharedService.mymetersArray = [];
        this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{
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
              console.log('Meter Page Loading completed')         
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
