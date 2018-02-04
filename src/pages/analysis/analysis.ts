import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationPage } from '../registeration/registeration';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";


@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {
  private chart: AmChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: SharedServiceProvider,
    public storage: Storage, private AmCharts: AmChartsService)
  {
  }

  ngOnInit(){    
    this.getBasicInformation();
    var chart = this.AmCharts.makeChart("chartdiv", {
      "type": "gauge",
      "hideCredits":true,
      "theme": "none",
      "axes": [{
        "axisAlpha": 0,
        "tickAlpha": 0,
        "labelsEnabled": false,
        "startValue": 0,
        "endValue": 100,
        "startAngle": 0,
        "endAngle": 270,
        "bands": [  {
          "color": "#eee",
          "startValue": 0,
          "endValue": 100,
          "radius": "80%",
          "innerRadius": "65%",
          "text": 45
        }, {
          "color": "#d1de3c",
          "startValue": 0,
          "endValue": 70,
          "radius": "80%",
          "innerRadius": "65%",
          "balloonText": "70"
        }, {
          "color": "#eee",
          "startValue": 0,
          "endValue": 100,
          "radius": "60%",
          "innerRadius": "45%"
        }, {
          "color": "#e6ec93",
          "startValue": 0,
          "endValue": 56,
          "radius": "60%",
          "innerRadius": "45%",
          "balloonText": "56"
        }]
      }],
      "allLabels": [{
        "text": "LEED Building Score",
        "x": "49%",
        "y": "15%",
        "size": 10,
        "bold": true,
        "color": "#414042",
        "align": "right"
      }, {
        "text": "Your Building Score",
        "x": "49%",
        "y": "24%",
        "size": 10,
        "bold": true,
        "color": "#414042",
        "align": "right"
      }],
      "export": {
        "enabled": true
      }
    });
  }

  getBasicInformation(){    
    this.storage.get(this.sharedService.basicInformation).then((data) =>{
      if(data){
       console.log(data);
      }else{
        console.log('Error in getting new item');
      }
    });
  } 

  save(){
    this.navCtrl.push(LoginPage);
  }

}
