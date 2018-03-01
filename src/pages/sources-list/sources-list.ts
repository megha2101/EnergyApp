import { Component, AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddSourcePage } from '../add-source/add-source';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { SourcePage } from '../source/source';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { DataInputServiceProvider } from '../../providers/data-input-service/data-input-service';
import { ConfigServiceProvider } from '../../providers/config-service/config-service';



@IonicPage()
@Component({
  selector: 'page-sources-list',
  templateUrl: 'sources-list.html',
})
export class SourcesListPage {

  private meter1Chart: AmChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, private AmCharts: AmChartsService,
  public sharedService: SharedServiceProvider, public dataInputService: DataInputServiceProvider,
  public configService: ConfigServiceProvider) {
  }

  ngAfterViewInit() {
    this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{
      for(var i = 0; i< this.sharedService.mymeters.length; i++)
     this.sharedService.drawMeterChart( this.sharedService.mymeters[0].id,  this.sharedService.mymeters[0].readings, '#D0DD3D', "smoothedLine",  this.sharedService.mymeters[0].native_unit );
    });
   
  }

  callFunction(metersData){
    console.log("metersData" + metersData);
    this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{
      for(var i = 0; i< this.sharedService.mymeters.length; i++)
     this.sharedService.drawMeterChart( this.sharedService.mymeters[0].id,  this.sharedService.mymeters[0].readings, '#D0DD3D', "smoothedLine",  this.sharedService.mymeters[0].native_unit );
    });
    console.log("metersData1" + metersData.name);
  }

  
  goToAddSourcePage(){
    this.navCtrl.push(AddSourcePage);    
  }

  goToSourcePage(){
    this.navCtrl.push(SourcePage);
  }

}
