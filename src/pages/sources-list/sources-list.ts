import { Component } from '@angular/core';
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
    this.sharedService.mymetersArray = [];
    this.dataInputService.getNumberOfMeters(this.configService, this.sharedService.selBuildObject.leed_id, this.sharedService.config_header_new).then((data)=>{
    //   for(var i = 0; i< this.sharedService.mymeters.length; i++)
    //  this.sharedService.drawMeterChart( this.sharedService.mymeters[i].id,  this.sharedService.mymeters[i].readings, '#D0DD3D', 'smoothedLine',  this.sharedService.mymeters[i].native_unit);
    });
   
  }

  callFunction(){
    for(var i = 0; i< this.sharedService.mymeters.length; i++)
    this.sharedService.drawMeterChart( this.sharedService.mymeters[i].id,  this.sharedService.mymeters[i].readings, '#D0DD3D', 'smoothedLine',  this.sharedService.mymeters[i].native_unit );
    return;
  }


  
  goToAddSourcePage(){
    this.navCtrl.push(AddSourcePage);    
  }

  goToSourcePage(){
    this.navCtrl.push(SourcePage);
  }

}
